import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { PlanService } from 'src/plan-service/entities/planService.entity';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
export class FindByDateDto {
  //revisar relacion de citas con enfermera y paciente
  @Type(() => String)
  @IsEnum(status, {
    each: true,
    message: 'The provided status is not valid. Valid states are: [confirmed, cancelled, finished, pending, expired].',

  })
  @IsOptional()
  status?: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;


  @IsNotEmpty()
  plan_serviceId: number;

}
