import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export enum rolType {
  NURSE = 'nurse',
  user = 'user',
  SECRETARY = 'secretary',
}
export class CreateRolDto {
  @IsNumber()
  @IsNotEmpty()
  rolId: number;

  @Type(() => String)
  @IsEnum(rolType, { message: 'rol type is required' })
  @IsNotEmpty()
  rolName: string;

  @Type(() => String)
  @IsEnum(status)
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
