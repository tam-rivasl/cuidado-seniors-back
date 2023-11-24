import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { observationType, status } from '../entities/observation.entity';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { UpdateDateColumn, DeleteDateColumn } from 'typeorm';


export class ObservationDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(status)
  status: status;

  @IsNotEmpty()
  @IsEnum(observationType)
  observationType: observationType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
 
  @IsNumber()
  @IsNotEmpty()
  appointmentId: number;
  
  @IsNumber()
  @IsOptional()
  nurseId: number;
}
