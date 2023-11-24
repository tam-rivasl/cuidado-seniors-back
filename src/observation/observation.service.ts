import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ObservationDto } from './dto/create-observation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Observation } from './entities/observation.entity';
import { PaginationQueryDto } from '../common/paginationQueryDto';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ){}
  public async createObservationPatient(
    observationDto: ObservationDto,
  ): Promise<Observation> {
    const appointmentId = observationDto.appointmentId;
    const nurseId = observationDto.nurseId;
    console.log('pasa?')
    const appointment = await this.appointmentRepository.findOne({
      where: {appointmentId: appointmentId}
    });

    if (appointment.status === 'expired' || appointment.status === 'cancelled' || appointment.status === 'pending') {
      throw new ConflictException('Cita se encuentra expirada, cancelada o pendiente a confirmacion, no se puede crear observacion');
    }
      const observation = {
        title: observationDto.title,
        description: observationDto.description,
        status: observationDto.status,
        observationType: observationDto.observationType,
        appointmentId: appointmentId,
        nurseId: nurseId
      };
   const create = this.observationRepository.create(observation)
  const result = await this.observationRepository.save(create)
   console.log('observation patient', create)
    return result
  }

public async findByAppointmentId(appointmentId: number, paginationQueryDto: PaginationQueryDto<Observation>) {
 try {
  const { limit, offset } = paginationQueryDto;
  const [contacts, count] = await this.observationRepository.findAndCount({
      where: { appointmentId:  appointmentId },
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
