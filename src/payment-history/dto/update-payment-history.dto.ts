import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePaymentHistoryDto {
  @IsNumber()
  @IsOptional()
  PaymentHistoryId: number;

  @IsNumber()
  @IsOptional()
  appointmentId: number;

  @IsNumber()
  @IsOptional()
  paymentId: number;
}
