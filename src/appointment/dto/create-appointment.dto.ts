import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { PaymentHistory } from 'src/payment-history/entities/paymentHistory.entity';
import { PlanService } from 'src/plan-service/entities/planService.entity';
import { User } from 'src/user/entities/user.entity';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
export class CreateAppointmentDto {
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
  nurse: User

  @IsOptional()
  patient?: User

  @IsNotEmpty()
  plan_service: PlanService;


  @IsOptional()
  payment_historyId?: PaymentHistory;
}
