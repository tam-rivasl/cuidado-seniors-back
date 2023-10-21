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
 
  @IsString()
  @IsNotEmpty()
  planServiceName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @Type(() => String)
  @IsEnum(status)
  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}
