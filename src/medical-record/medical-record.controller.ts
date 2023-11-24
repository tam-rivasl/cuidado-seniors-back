import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto, @UploadedFile() file: Express.Multer.File) {
    return this.medicalRecordService.create(createMedicalRecordDto, file);
  }

  @Get()
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(':patientId')
  findOne(@Param('patientId') patientId: number) {
    return this.medicalRecordService.findOne(patientId);
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordService.update(+id, updateMedicalRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordService.remove(+id);
  }
  */
}
