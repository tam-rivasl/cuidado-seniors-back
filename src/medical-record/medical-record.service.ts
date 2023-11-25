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
  ) {
    const patientId = createMedicalRecordDto.patientId;
    console.log('flag1')
    if (!patientId) {
      throw new NotFoundException('Error, usuario no encontrado');
    }
    console.log('flag2')

    const data = {
      alergias: createMedicalRecordDto.alergias,
      medicamentos: createMedicalRecordDto.medicamentos,
      dosisMedicamentos: createMedicalRecordDto.dosisMedicamentos,
      tipoEnfermedad: createMedicalRecordDto.tipoEnfermedad,
      patientId: createMedicalRecordDto.patientId,
      descripcionPatologia: createMedicalRecordDto.descripcionPatologia
    }
    console.log(data, 'data archivo')
    const medicalRecord = this.medicalRecordRepository.create(data);
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
    console.log(medicalRecord,'medical record')
    if (!medicalRecord) {
      console.log('se cae aca ')
      throw new NotFoundException(`No se encontro Ficha medica con ID ${medicalRecord.medical_recordId}`);
    }
    return medicalRecord;
  }
}
