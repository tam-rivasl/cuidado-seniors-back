import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export class CreatePlanServiceDto {
  @IsNumber()
  @IsNotEmpty()
  planServiceId: number;

  @IsString()
  @IsNotEmpty()
  planServiceName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

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
