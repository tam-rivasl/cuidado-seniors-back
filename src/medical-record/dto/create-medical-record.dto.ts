import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  medical_recordId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @Type(() => String)
  @IsEnum(status)
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @IsNotEmpty()
  file: Buffer;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}