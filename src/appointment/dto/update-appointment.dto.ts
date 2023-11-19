import {  IsNumber } from 'class-validator';

export class UpdateAppointmentDto {
  @IsNumber()
  appointmentId: number;

}
