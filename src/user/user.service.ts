import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { Rol, status } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { ICreateUser } from './interfaces/create-user.interface';
import { LoginDto } from './dto/loginDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}
  //Funcion que valida si el email ya existe.
  private async validateEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });
    if (result) {
      throw new BadRequestException(`Email ya se encuentra registrado ${email}`);
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
  private async findDocumentNumber(
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
  public async createRol(createRolDto: CreateRolDto): Promise<Rol> {
    // Busca el rol en la base de datos o crea uno si no existe
    const newRol: CreateRolDto = this.rolRepository.create({
      rolName: createRolDto.rolName,
      status: status.ACTIVE,
    });
    console.log('new rol:', newRol);
    try {
      const save = await this.rolRepository.save(newRol);
      console.log('result rol:', save);
      return save;
    } catch (e) {
      throw new ConflictException(e.message, 'Error al crear  rol usuario');
    }
  }
  public async userCreate(createUserDto: CreateUserDto): Promise<ICreateUser> {
    // regex clean .

    await this.findDocumentNumber(createUserDto.identificationNumber);
    await this.validateEmail(createUserDto.email.toLocaleLowerCase());
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
      address: createUserDto.adress,
      status: status.ACTIVE,
      rol: {
        rolId: createUserDto.rolId,
      },
    });

    console.log('user', user);
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
        address: createUserDto.adress,
        gender: createUserDto.gender,
        status: status.ACTIVE,
      };
      return result;
    } catch (e) {
      console.log('error')
      throw new ConflictException(e.message, 'Error al crear Usuario');
    }
  }

  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Busca al usuario por su dirección de correo electrónico
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['rol'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log('contrasena encriptada', user.password);
    if (!user.password) {
      throw new UnauthorizedException('Incorrect credencials');
    }

    if (!user.email) {
      throw new UnauthorizedException('Incorrect credencials');
    }
    // Compara la contraseña ingresada en el DTO (en texto claro) con la contraseña almacenada en la base de datos (encriptada)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Genera un token JWT para el usuario al iniciar sesión correctamente
    const payload = {
      rolId: user.rol.rolId,
      email: user.email,
      userId: user.userId,
      rolName: user.rol.rolName,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return payload;
  }

  public async findAll(paginationQueryDto: PaginationQueryDto<User>) {
    const { limit, offset } = paginationQueryDto;
    const findAllUser = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: ['rol'],
    });
    if (!findAllUser) {
      throw new NotFoundException('Not users to find');
    } else {
      return findAllUser;
    }
  }

  public async findAllNurses(paginationQueryDto: PaginationQueryDto<User>) {
    const { limit, offset } = paginationQueryDto;
    const findAllUser = await this.userRepository.find({
      where: { rol: { rolName: 'nurse' } },
      take: limit,
      skip: offset,
      relations: ['rol'],
    });
    if (!findAllUser) {
      throw new NotFoundException('Not nurses to find');
    } else {
      return findAllUser;
    }
  }

  //validar que se caiga cuando no existe el id
  public async findOne(userId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId: userId },
      relations: ['rol', 'emergency_contactId', 'patient_medicalRecord'],
    });

    console.log(findUser, 'usuario encontrado con emergency??')
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
      await this.findDocumentNumber(updateUserDto.identificationNumber);
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

  public async updateStatus(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    console.log("user", user)
    if (!user) {
      console.log("flag2")
      throw new NotFoundException('Usuario no encontrado');
    }
    if(user.status === 'inactive'){
      console.log("flag3")
      throw new ConflictException('Usuario ya se encuentra desactivado')
    }
   const result = await this.userRepository.save({
      userId: userId,
      status: status.INACTIVE,
    });
    return result
  }
}
