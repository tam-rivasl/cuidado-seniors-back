import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @Type(() => String)
  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @IsNotEmpty()
  file: Buffer;
/*
  @IsString()
  @IsNotEmpty()
  mimetype: string;
  */
}
