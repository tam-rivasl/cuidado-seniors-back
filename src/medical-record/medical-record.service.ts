import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecord } from './entities/medicalRecord.entity';
import { error } from 'console';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
  ) {}

 public async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
    file: Express.Multer.File,
  ) {
    console.log('flag1')
    if (!file) {
      throw new NotFoundException('Error, no existe archivo para subir');
    }
    console.log('flag2')
    if(!createMedicalRecordDto.patientId){
      throw new NotFoundException('Error, usuario no encontrado')
    }
    const dataFile = {
      fileName: file.originalname,
      patientId: createMedicalRecordDto.patientId,
      status: 'active',
      file: file.buffer,
    };
    console.log('flag3', dataFile)
    const req: CreateMedicalRecordDto = {
      fileName: dataFile.fileName,
      patientId: dataFile.patientId,
      status: dataFile.status,
      file: dataFile.file,
    }
    console.log(dataFile, 'data archivo')
    const medicalRecord = this.medicalRecordRepository.create(req);
    try {
      const result = await this.medicalRecordRepository.save(medicalRecord);
      console.log('flag5', result)
      return result
    } catch (e) {
      console.log('se cae en error', e)
      throw new ConflictException('Error al subir archivo')
    }
  }

 public async findAll() {
    return this.medicalRecordRepository.find();
  }

 public async findOne(patientId: number) {
    const medicalRecord = await this.medicalRecordRepository.findOne({
      where: { patientId: patientId },
    });
    if (!medicalRecord) {
      throw new NotFoundException(`Medical record with ID ${medicalRecord.medical_recordId} not found`);
    }
    return medicalRecord;
  }
/*
 public async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medicalRecord = await this.findOne(id);
    this.medicalRecordRepository.merge(medicalRecord, updateMedicalRecordDto);
    return this.medicalRecordRepository.save(medicalRecord);
  }

 public async remove(id: number) {
    const medicalRecord = await this.findOne(id);
    return this.medicalRecordRepository.remove(medicalRecord);
  }*/
}
