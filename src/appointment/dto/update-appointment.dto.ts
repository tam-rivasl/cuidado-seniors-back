import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export enum status {
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}

export class UpdateAppointmentDto {
  @Type(() => String)
  @IsEnum(status, {
    each: true,
    message:
      'missing params status: [confirmed,cancelled,finished,pending,expired]',
  })
  @IsOptional()
  status?: string;

  @IsDate()
  @IsOptional()
  date?: Date;
}
