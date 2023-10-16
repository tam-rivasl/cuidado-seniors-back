import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEmergencyContact } from './entities/patient_emergency_contact.entity';
import { Repository } from 'typeorm';
import { EmergencyContact } from './entities/nested/emergency_contact.entity';
import { CreateContactDto } from './dto/contact.dto';
import { PatientContactDto } from './dto/patientContact.dto';
import { User } from 'src/user/entities/user.entity';
import { PaginationQueryDto } from '../common/paginationQueryDto';
@Injectable()
export class EmergencyContactService {
  constructor(
    @InjectRepository(PatientEmergencyContact)
    private readonly patientEmergencyContactRepository: Repository<PatientEmergencyContact>,
    @InjectRepository(EmergencyContact)
    private readonly emergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createEmergencyContact(createContactDto: CreateContactDto) {
    try {
      const emergencyContact: CreateContactDto = {
        firstName: createContactDto.firstName,
        lastName: createContactDto.lastName,
        email: createContactDto.email,
        phoneNumber: createContactDto.phoneNumber,
        relationship: createContactDto.relationship,
        status: createContactDto.status,
      };
      this.emergencyContactRepository.create(emergencyContact);
      const result =
        await this.emergencyContactRepository.save(emergencyContact);
      return result;
    } catch (e) {
      throw new ConflictException('Error to create contact emergency');
    }
  }
  public async createContactPatient(
    patientContactDto: PatientContactDto,
    userId: number,
  ) {
    const contact = await this.createEmergencyContact(
      patientContactDto.contact,
    );
    try {
      const user = await this.userRepository.findOne({
        where: { userId: userId },
      });
      const emergencyContact = await this.emergencyContactRepository.findOne({
        where: { emergencyContactId: contact.emergencyContactId },
      });
      console.log('usuario', user);
      console.log('contacto', emergencyContact);
      if (user && emergencyContact) {
        const patientEmergencyContact = new PatientEmergencyContact();
        patientEmergencyContact.patientId = user;
        patientEmergencyContact.emergency_contact = emergencyContact;
        console.log('patient contact', patientEmergencyContact);
        await this.patientEmergencyContactRepository.save(
          patientEmergencyContact,
        );
        console.log('save');
        return patientEmergencyContact;
      } else {
        throw new NotFoundException('User or emergency contact not found');
      }
    } catch (error) {
      throw new HttpException(
        'Error creating the emergency contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAllByPatientId(
    patientId: number,
    paginationQueryDto: PaginationQueryDto<PatientEmergencyContact>,
  ): Promise<[PatientEmergencyContact[], number]> {
    try {
      const { limit, offset } = paginationQueryDto;
      const [contacts, count] =
        await this.patientEmergencyContactRepository.findAndCount({
          where: {
            patientId: {userId: patientId},
          },
          relations: ['emergency_contact'],
          take: limit,
          skip: offset,
        });
      return [contacts, count];
    } catch (e) {
      throw new NotFoundException('Patient contact not found');
    }
  }

  public async findOne(emergencyContactId: number) {
    try {
      const contact = await this.patientEmergencyContactRepository.findOne({
        where: {
          emergency_contact: {
            emergencyContactId: emergencyContactId
          }
        },
        relations: ['emergency_contact'],
      });
      if (!contact) {
        throw new NotFoundException(`Patient contact #${emergencyContactId} not found`);
      }
      return contact;
    } catch (e) {
      throw new NotFoundException(`Patient contact #${emergencyContactId} not found`);
    }
  }
  
  public async removeContact(patientId: number, emergencyContactId: number): Promise<PatientEmergencyContact> {
    try {
      // Search for the relationship between the patient and the emergency contact
      const patientEmergencyContact = await this.patientEmergencyContactRepository.findOne({
        where: {
          patientId: {userId: patientId},
          emergency_contact: { emergencyContactId },
        },
        relations: ['emergency_contact'],
      });
      console.log('contacto', patientEmergencyContact)
      if (!patientEmergencyContact) {
        throw new NotFoundException('The relationship between the patient and the emergency contact was not found.');
      }

      // Delete the relationship
      return await this.patientEmergencyContactRepository.remove(patientEmergencyContact);
    } catch (error) {
      throw new NotFoundException('Failed to delete the emergency contact.');
    }
  }
}
