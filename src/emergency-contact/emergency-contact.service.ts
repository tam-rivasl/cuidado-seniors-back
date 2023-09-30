import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEmergencyContact } from './entities/patient_emergency_contact.entity';
import { Repository } from 'typeorm';
import { EmergencyContact } from './entities/nested/emergency_contact.entity';
@Injectable()
export class EmergencyContactService {
  /*private logger = new Logger(
    pkg.name + '-' + pkg.version + '-' + EmergencyContactService.name,
  );*/
  constructor(
    @InjectRepository(PatientEmergencyContact)
    private readonly patientEmergencyContact: Repository<PatientEmergencyContact>,
    @InjectRepository(EmergencyContact)
    private readonly emergencyContact: Repository<EmergencyContact>,
  ) {}

  async createEmergencyContact(
    patientId: number,
    createEmergencyContactDto: CreateEmergencyContactDto,
  ) {
    try {
      if (patientId) {
        console.log('first flag:');
        const emergency_contact: CreateEmergencyContactDto = {
          patient_emergency_contactId:
            createEmergencyContactDto.patient_emergency_contactId,
          emergency_contactId: createEmergencyContactDto.emergency_contactId,
          patientId: createEmergencyContactDto.patientId,
          firstName: createEmergencyContactDto.firstName,
          lastName: createEmergencyContactDto.lastName,
          email: createEmergencyContactDto.email,
          phoneNumber: createEmergencyContactDto.phoneNumber,
          relationship: createEmergencyContactDto.relationship,
          status: createEmergencyContactDto.status,
        };
        console.log('email:', emergency_contact.email);
        const contact = this.patientEmergencyContact.create({
          emergency_contact,
        });
        console.log('contact', contact);
        //const result = await this.patientEmergencyContact.save(contact);
        //console.log('result:', result);
        return contact;
      } else {
        const message = 'PacientId not found';
        /* this.logger.error({
          contextMap: {
            message: 'DB error: ' + JSON.stringify(message),
            method: 'createEmergencyContact',
            status: HttpStatus.NOT_FOUND + 404,
            data: {
              patientId,
              createEmergencyContactDto,
            },
          },
        });*/
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      console.log('error:', e.message);
      const message = 'Error to create emergency contact';
      /*this.logger.error({
        contextMap: {
          message: 'DB error: ' + JSON.stringify(e.message),
          method: 'createEmergencyContact',
          status: HttpStatus.BAD_REQUEST + 400,
          data: {
            patientId,
            createEmergencyContactDto,
          },
        },
      });*/
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByPatientId(
    patientId: number,
  ): Promise<[PatientEmergencyContact[], number]> {
    try {
      if (patientId) {
        const [contacts, count] =
          await this.patientEmergencyContact.findAndCount({
            where: {
              patientId: { userId: patientId },
            },
          });
        return [contacts, count];
      }
    } catch (e) {
      const message = 'PatientId not found';
      /*this.logger.error({
        contextMap: {
          message: 'DB error: ' + JSON.stringify(e.message),
          method: 'findAllByPatientId',
          status: HttpStatus.NOT_FOUND + 404,
          data: {
            patientId,
          },
        },
      });*/
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} emergencyContact`;
  }

  update(id: number, updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return `This action updates a #${id} emergencyContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} emergencyContact`;
  }
}
