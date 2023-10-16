import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export class CreateContactDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;

  @Type(() => String)
  @IsEnum(status)
  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}
