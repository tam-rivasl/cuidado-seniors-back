import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdatePlanServiceDto {
  @IsString()
  @IsOptional()
  planServiceName?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @Type(() => String)
  @IsEnum(status)
  @IsOptional()
  status?: string;
}
