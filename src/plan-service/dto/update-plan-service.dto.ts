import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
} from 'class-validator';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdatePlanServiceDto {
  @IsNumber()
  planServiceId: number;


  @Type(() => String)
  @IsEnum(status)
  status?: string;
}
