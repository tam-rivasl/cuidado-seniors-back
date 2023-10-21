
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateRolDto {
  @IsNumber()
  @IsOptional()
  rolId?: number;
   
  @IsString()
  @IsNotEmpty()
  rolName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
