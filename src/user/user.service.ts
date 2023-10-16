import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ICreateUser } from './interfaces/create-user.interface';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { Rol, rolType, status } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { EmergencyContact } from 'src/emergency-contact/entities/nested/emergency_contact.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    @InjectRepository(EmergencyContact)
    private emergencyContactRepository: Repository<EmergencyContact>,
  ) {}
  //Funcion que valida si el email ya existe.
  private async validateEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });
    if (result) {
      throw new BadRequestException(`User email exists ${email}`);
    }
  }
  //Funcion que elimina la contraseña del usuari si este ya esta registrado con el rut
  private sanitizeUser(user: User) {
    if (user) {
      delete user['password'];
    }
    return user;
  }
  //encodificar contrase;a
  async encodePassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10).then(function (hash) {
      return hash;
    });
  }
  private async validateDocumentNumber(
    identificationNumber: string,
  ): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { identificationNumber: identificationNumber },
    });
    if (result) {
      throw new HttpException(
        `User identificationNumber exists ${identificationNumber}`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.sanitizeUser(result);
    }
  }

  async createRol(rolName: any): Promise<Rol> {

    console.log('ola2');
    if (rolName === 'nurse') {
      rolName = rolType.NURSE;
      console.log('rolname', rolName);
    } else if (rolName === 'secretary') {
      rolName = rolType.SECRETARY;
      console.log('rolname',rolName);
    } else {
      rolName = rolType.user;
    }
    // Busca el rol en la base de datos o crea uno si no existe
    const rol = await this.rolRepository.findOne({
      where: { rolName:rolName },
    });
    if (!rol) {
      // El rol no existe, así que lo creamos
      const newRol: CreateRolDto = await this.rolRepository.create({
        rolName: rolName,
        status: status.ACTIVE,
      });
      console.log('new rol:', newRol);
      try {
        const save = await this.rolRepository.save(newRol);
        console.log('result rol:', save);
        return save;
      } catch (e) {
        throw new ConflictException(e.message, 'Error to create rol');
      }
    }else{
    const preload = await this.rolRepository.preload(rol)
    return preload;
    }
  }
  public async userCreate(createUserDto: CreateUserDto): Promise<ICreateUser> {
    if (createUserDto.identificationNumber) {
      try {
        // regex clean .
        const identificationNumber = createUserDto.identificationNumber.replace(
          /\./g,
          '',
        );
        await this.validateDocumentNumber(identificationNumber);
      } catch (e) {
        throw new BadRequestException('identificationNumber already exists');
      }
    }
    if (createUserDto.email) {
      await this.validateEmail(createUserDto.email.toLocaleLowerCase());
    }
    const pass = await this.encodePassword(createUserDto.password);
    const user = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      identificationNumber: createUserDto.identificationNumber,
      age: createUserDto.age,
      birthDate: createUserDto.birthDate,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      password: pass,
      gender: createUserDto.gender,
      status: createUserDto.status,
    });
    const rol = await this.createRol(createUserDto.rolName);
    user.rol = rol;
    console.log('rol',rol)
    try {
      const save = await this.userRepository.save(user);
      console.log('save', save);
      const result: ICreateUser = {
        userId: save.userId,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phoneNumber: createUserDto.phoneNumber,
        birthDate: createUserDto.birthDate,
        age: createUserDto.age,
        identificationNumber: save.identificationNumber,
        password: createUserDto.password,
        gender: createUserDto.gender,
        status: createUserDto.status,
      };
      return result;
    } catch (e) {
      throw new ConflictException(e.message, 'Error to create user');
    }
  }

  public async findAll(paginationQueryDto: PaginationQueryDto<User>) {
    const { limit, offset } = paginationQueryDto;
    const findAllUser = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    if (!findAllUser) {
      throw new NotFoundException('Not users to find');
    } else {
      return findAllUser;
    }
  }

  //validar que se caiga cuando no existe el id
  public async findOne(userId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!findUser) {
      throw new NotFoundException(`Not found user: ${userId}`);
    } else {
      return findUser;
    }
  }

  public async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    let email;
    const findUser = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!findUser) {
      throw new NotFoundException(`Not found user: ${userId}`);
    }
    if (
      updateUserDto.identificationNumber.localeCompare(
        findUser.identificationNumber,
      ) !== 0
    ) {
      await this.validateDocumentNumber(updateUserDto.identificationNumber);
    }
    if (updateUserDto.email.localeCompare(findUser.email) !== 0) {
      email = updateUserDto.email.toLocaleLowerCase();
    }
    const userUpdate = await this.userRepository.preload({
      userId: +findUser.userId,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: email,
      age: updateUserDto.age,
      birthDate: updateUserDto.birthDate,
      gender: updateUserDto.gender,
      phoneNumber: updateUserDto.phoneNumber,
      status: updateUserDto.status,
    });
    try {
      const result = await this.userRepository.save(userUpdate);
      return {
        userId: result.userId,
        message: 'The user was updated successfully',
      };
    } catch (e) {
      throw new BadRequestException(`Error to update user: ${userId}`);
    }
  }

//Agregar al controller!!
 /* public async emergencyContact(createEmergencyContactDto: CreateEmergencyContactDto, userId: number): Promise<User>{
    const user = await this.findOne(userId)

    if(user){
      const createContact: CreateEmergencyContactDto ={
          patientId: userId,
          firstName: createEmergencyContactDto.firstName,
          lastName: createEmergencyContactDto.lastName,
          email: createEmergencyContactDto.email,
          phoneNumber: createEmergencyContactDto.phoneNumber,
          relationship: createEmergencyContactDto.relationship,
          status: createEmergencyContactDto.status,
        };
      }
  return
  }
  */
}
