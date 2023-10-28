import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { CreateContactDto } from 'src/emergency-contact/dto/contact.dto';
import { CreateMedicalRecordDto } from 'src/medical-record/dto/create-medical-record.dto';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from '../entities/rol.entity';

export class CreateUserDto {

  @IsNumber()
  @IsNotEmpty()
  rolId: number;
  @IsOptional()
  medicalRecord: CreateMedicalRecordDto;

  @IsOptional()
  emergencyContact: CreateContactDto;
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  adress: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
