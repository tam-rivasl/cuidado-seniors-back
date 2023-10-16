import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEmergencyContact } from './entities/patient_emergency_contact.entity';
import { Repository } from 'typeorm';
import { EmergencyContact } from './entities/nested/emergency_contact.entity';
import { CreateContactDto } from './dto/contact.dto';
import { PatientContactDto } from './dto/patientContact.dto';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class EmergencyContactService {
  /*private logger = new Logger(
    pkg.name + '-' + pkg.version + '-' + EmergencyContactService.name,
  );*/
  constructor(
    @InjectRepository(PatientEmergencyContact)
    private readonly patientEmergencyContactRepository: Repository<PatientEmergencyContact>,
    @InjectRepository(EmergencyContact)
    private readonly emergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  public async createEmergencyContact(
    userId: number,
    createContactDto: CreateContactDto,
   ) {
    const user = await this.userRepository.find({
      where: {userId: userId}
    }); 
    let result;
    if (user) {
      console.log('first flag:');
      const emergencyContact: CreateContactDto = {
        firstName: createContactDto.firstName,
        lastName: createContactDto.lastName,
        email: createContactDto.email,
        phoneNumber: createContactDto.phoneNumber,
        relationship: createContactDto.relationship,
        status: createContactDto.status,
      };
      console.log('contacto emergency:', emergencyContact);
      const create = await this.emergencyContactRepository.create(emergencyContact);
      console.log('contact', create);
      result = await this.emergencyContactRepository.save(emergencyContact);
      console.log('result:', result);
    return result;
    }
      const findContact = await this.emergencyContactRepository.find({
        where: {emergency_contactId: result.emergency_contactId}
      })

      if(findContact){
        const patientContact = {
          patientId: userId,
          contact: {
            firstName: createContactDto.firstName,
            lastName: createContactDto.lastName,
            email: createContactDto.email,
            phoneNumber: createContactDto.phoneNumber,
            relationShip: createContactDto.relationship,
            status: createContactDto.status,
          }
        } 
      }else{
        throw new NotFoundException('Emergency contact ')
      }
      return result;
    } else {
      const message = 'PacientId not found';
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
  async findAllByPatientId(
    patientId: number,
  ): Promise<[PatientEmergencyContact[], number]> {
    try {
      if (patientId) {
        const [contacts, count] =
          await this.patientEmergencyContactRepository.findAndCount({
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
