import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { PatientContactDto } from './dto/patientContact.dto';
import { PatientEmergencyContact } from './entities/patient_emergency_contact.entity';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';

@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(
    private readonly emergencyContactService: EmergencyContactService,
  ) {}

  @Post(':pacientId/create')
  async create(
    @Param('pacientId', ParseIntPipe) patientId: number,
    @Body() patientContactDto: PatientContactDto,
  ) {
    return this.emergencyContactService.createContactPatient(
      patientContactDto,
      patientId,
    );
  }

  @Get(':patientId')
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto<PatientEmergencyContact>,
    @Param('patientId', ParseIntPipe) patientId: number
    ) {
    return this.emergencyContactService.findAllByPatientId(patientId,paginationQueryDto);
  }

  @Get(':emergencyContactId/contact')
  async findOne(
    @Param('emergencyContactId', ParseIntPipe) emergencyContactId: number,
  ) {
    return this.emergencyContactService.findOne(emergencyContactId);
  }

  @Delete(':patientId/:emergencyContactId/delete')
  async remove(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Param('emergencyContactId', ParseIntPipe)emergencyContactId: number,
  ) {
    return this.emergencyContactService.removeContact(patientId,emergencyContactId);
  }
}
