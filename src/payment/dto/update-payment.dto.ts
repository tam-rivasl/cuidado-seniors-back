import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsString()
  @IsOptional()
  transaccionId?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  buildOrder?: string;

  @IsOptional()
  transaccionDate?: Date;

  @IsString()
  @IsOptional()
  seccionId?: string;
}
