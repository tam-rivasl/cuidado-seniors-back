import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateMedicalRecordDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsEnum(status)
  @IsOptional()
  status?: status;

  @IsOptional()
  file?: Buffer;

  @IsString()
  @IsOptional()
  mimetype?: string;
}
