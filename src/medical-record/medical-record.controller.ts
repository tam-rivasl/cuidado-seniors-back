import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post('create')
  public async create(
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
  ) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @Get()
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(':patientId')
  public async findOne(@Param('patientId') patientId: number) {
    return this.medicalRecordService.findOne(patientId);
  }
}
