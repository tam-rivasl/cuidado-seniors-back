import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(
    private readonly emergencyContactService: EmergencyContactService,
  ) {}

  @Post(':pacientId/create')
  create(
    @Param('pacientId', ParseIntPipe) patientId: number,
    @Body() createEmergencyContactDto: CreateEmergencyContactDto,
  ) {
    return this.emergencyContactService.createEmergencyContact(
      patientId,
      createEmergencyContactDto,
    );
  }

  @Get(':patientId')
  findAll(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.emergencyContactService.findAllByPatientId(patientId);
  }

  @Get(':patient_emergency_contactId')
  findOne(
    @Param('patient_emergency_contactId', ParseIntPipe)
    patient_emergency_contactId: number,
  ) {
    return this.emergencyContactService.findOne(patient_emergency_contactId);
  }

  @Patch(':patient_emergency_contactId/update')
  update(
    @Param('patient_emergency_contactId', ParseIntPipe)
    patient_emergency_contactId: number,
    @Body() updateEmergencyContactDto: UpdateEmergencyContactDto,
  ) {
    return this.emergencyContactService.update(
      patient_emergency_contactId,
      updateEmergencyContactDto,
    );
  }

  @Delete(':patient_emergency_contactId/delete')
  remove(
    @Param('patient_emergency_contactId', ParseIntPipe)
    patient_emergency_contactId: number,
  ) {
    return this.emergencyContactService.remove(patient_emergency_contactId);
  }
}
