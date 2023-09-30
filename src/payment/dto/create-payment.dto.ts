import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @IsString()
  @IsNotEmpty()
  transaccionId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  buildOrder: string;

  @IsDate()
  @IsNotEmpty()
  transaccionDate: Date;

  @IsString()
  @IsNotEmpty()
  seccionId: string;
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
