import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/nested/emergency_contact.entity';
import { EmergencyContactController } from './emergency-contact.controller';
import { EmergencyContactService } from './emergency-contact.service';
import { PatientEmergencyContact } from './entities/patient_emergency_contact.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyContact, PatientEmergencyContact, User]),
  ],
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService],
})
export class EmergencyContactModule {}
