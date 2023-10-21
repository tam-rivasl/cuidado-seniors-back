import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PlanService } from 'src/plan-service/entities/planService.entity';
import { PaginationQueryDto } from '../common/paginationQueryDto';
import { NoFilesInterceptor } from '@nestjs/platform-express';
export enum status {
  CONFIMED = 'confirmed',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PlanService)
    private readonly planserviceRespository: Repository<PlanService>,
  ) {}

  //crear planes de servicio y login primero antes de terminar esto.
  public async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    nurseId: number,
    planServiceId: number,
  ) {
    console.log('first flag')
    // Verificar si existe el usuario (paciente)
    const nurse = await this.userRepository.findOne({
      where: { userId: nurseId },
    });
    const plan = await this.planserviceRespository.findOne({
      where: {plan_serviceId: planServiceId}
    })
    console.log('existe el plan?', plan);
    console.log('usuario existe?', nurse);
    if (!nurse && !plan) {
      throw new NotFoundException(`User not found with ID ${nurseId} or Plan service not found ${planServiceId} `);
    }
      const appointment: CreateAppointmentDto = {
        status: status.PENDING,
        date: createAppointmentDto.date,
        plan_service: plan,
        nurse: nurse,
      };
    console.log('creacion de cita',appointment)
    const create =  this.appointmentRepository.create(appointment);
    const result =  await this.appointmentRepository.save(create);
    console.log('resultado de la cita creada por la enfermera', result)
    return result
  }
//TODO: DESCUBRIR PORQUE NO BUSCA EL ID DE PATIENT
public async createAppointmentPatient(patientId: number, nurseId: number, createAppointmentDto: CreateAppointmentDto){
  const patient = await this.userRepository.findOne({
    where: { userId: patientId },
  });
if(!patient){
  throw new NotFoundException(`User not found with ID ${patientId}`)
}
try{
 const appointment = await this.createAppointment(createAppointmentDto, nurseId, patientId );
 appointment.patient = patient;
 appointment.status = status.CONFIMED;
 const result = await this.appointmentRepository.save(appointment);
 return result;
}catch(e){
  throw new ConflictException('Error to create appointment', e.message)
}
}

public async findAll(paginationQueryDto: PaginationQueryDto<Appointment>) {
    const { limit, offset } = paginationQueryDto;
    const [contacts, count] = await this.appointmentRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['nurse', 'patient', 'plan_service']
    })
    return [contacts, count];
  }

 public async findOne(appointmentId: number) {
  
    const appointment = await this.appointmentRepository.findOne({
      where: {appointmentId: appointmentId},
      relations: ['nurse', 'patient', 'plan_service']
    });
    if(!appointment){
      throw new NotFoundException(`Appointment not found with ID ${appointmentId} `)
    }
    return appointment;
  }
  
  //TODO: hacerlo despues
  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
