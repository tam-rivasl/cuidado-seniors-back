import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  appointmentId: number;
  //revisar relacion de citas con enfermera y paciente
  @IsNumber()
  @IsOptional()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  nurseId: number;

  @Type(() => String)
  @IsEnum(status, {
    each: true,
    message: 'Status is required',
  })
  @IsNotEmpty()
  status: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  planServiceId: number;

  @IsNumber()
  @IsOptional()
  payment_historyId?: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
