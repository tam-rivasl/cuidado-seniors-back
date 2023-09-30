import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

export enum userGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  identificationNumber?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(userGender)
  @IsOptional()
  gender?: string;

  @IsEnum(userStatus)
  @IsOptional()
  status?: string;
}
