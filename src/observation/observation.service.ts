import { Injectable, NotFoundException } from '@nestjs/common';
import { ObservationDto } from './dto/create-observation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Observation } from './entities/observation.entity';
import { PaginationQueryDto } from '../common/paginationQueryDto';

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
  ){}
  public async createObservationPatient(
    observationDto: ObservationDto,
    patientId: number,
  ): Promise<Observation> {
    console.log('pasa?')
    const patient = await this.userRepository.findOne({
      where: {userId: patientId}
    });
    console.log('paciente', patient)
    if (!patient) {
      throw new NotFoundException('patientId or nurseId not found');
    }
      const observation = {
        title: observationDto.title,
        description: observationDto.description,
        status: observationDto.status,
        observationType: observationDto.observationType,
        patient: patient
      };
   this.observationRepository.create(observation)
  const result = await this.observationRepository.save(observation)
   console.log('observation patient', observation)
    return result
  }

  public async createObservationNurse(
    observationDto: ObservationDto,
    nurseId: number,
    patientId: number,
  ): Promise<Observation> {
    console.log('pasa?')
    const nurse = await this.userRepository.findOne({
      where: {userId: nurseId}
    });
    const patient = await this.userRepository.findOne({
      where: {userId: patientId}
    });
    console.log('nurse', nurse)
    console.log('patientId', patient)
    if (!nurse || !patient) {
      throw new NotFoundException('patientId or nurseId not found');
    }
      const observation = {
        title: observationDto.title,
        description: observationDto.description,
        status: observationDto.status,
        observationType: observationDto.observationType,
        patient: patient,
        nurse: nurse,
      };
   this.observationRepository.create(observation)
   console.log('observation nurse', observation)
  const result = await this.observationRepository.save(observation)
    return result
  }
public async findByPatientId(patientId: number, paginationQueryDto: PaginationQueryDto<Observation>) {
 try {
  const { limit, offset } = paginationQueryDto;
  const [contacts, count] = await this.observationRepository.findAndCount({
      where: { patient: {userId: patientId }},
      relations: ['patient'],
      take: limit,
      skip: offset,
    });
    return [contacts, count];
  }catch(e){
    throw new NotFoundException('Usuario no encontrado', e.message);
  }
}
}
