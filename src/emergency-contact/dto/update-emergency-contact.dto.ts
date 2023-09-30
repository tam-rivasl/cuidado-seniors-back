import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateEmergencyContactDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  relationship?: string;

  @Type(() => String)
  @IsEnum(status)
  @IsOptional()
  status?: string;
}
