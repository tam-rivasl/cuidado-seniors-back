import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';
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
  patient: number;
  
  @IsNumber()
  @IsOptional()
  nurse: number;
}
