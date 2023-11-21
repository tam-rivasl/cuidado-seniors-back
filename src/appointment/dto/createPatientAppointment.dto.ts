import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
export class CreatePatientAppointmentDto {

  @Type(() => String)
  @IsEnum(status, {
    each: true,
    message: 'The provided status is not valid. Valid states are: [confirmed, cancelled, finished, pending, expired].',

  })
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsNumber()
  appointmentId: number;

  @IsNotEmpty()
  patientId?: number;

}
