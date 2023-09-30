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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  //Funcion que valida si el email ya existe.
  private async validateEmail(email: string) {
    console.log('email?', email);
    const result = await this.userRepository.findOne({
      where: { email: email },
    });
    console.log('result', result);
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
    console.log(result);
    if (result) {
      throw new HttpException(
        `User identificationNumber exists ${identificationNumber}`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.sanitizeUser(result);
    }
  }
  //buscar que ondi el rolId
  public async userCreate(createUserDto: CreateUserDto): Promise<ICreateUser> {
    if (createUserDto.identificationNumber) {
      console.log('first glag');
      try {
        console.log('first flag');
        // regex clean .
        const identificationNumber = createUserDto.identificationNumber.replace(
          /\./g,
          '',
        );
        await this.validateDocumentNumber(identificationNumber);
        console.log('second flag');
      } catch (e) {
        throw new BadRequestException('identificationNumber already exists');
      }
    }
    console.log('first glag');
    if (createUserDto.email) {
      console.log('email', createUserDto.email);
      await this.validateEmail(createUserDto.email.toLocaleLowerCase());
    }
    const pass = await this.encodePassword(createUserDto.password);
    console.log('flag', pass);
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
    console.log('3 flag');
    console.log('create user', user);
    try {
      console.log('se cae en el save?');
      const save = await this.userRepository.save(user);
      console.log('save');
      const result: ICreateUser = {
        userId: save.userId,
        rolId: createUserDto.rolId,
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
      console.log('result', result);
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
    console.log('usuario', findUser);
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
}
