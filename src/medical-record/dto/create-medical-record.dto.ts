import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  alergias: string;

  @IsString()
  @IsNotEmpty()
  medicamentos: string;

  @IsString()
  @IsNotEmpty()
  dosisMedicamentos: string;

  @IsString()
  @IsNotEmpty()
  tipoEnfermedad: string;

  @IsString()
  @IsNotEmpty()
  descripcionPatologia: string;
  

}
