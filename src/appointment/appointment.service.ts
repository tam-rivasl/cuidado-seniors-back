import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PlanService } from 'src/plan-service/entities/planService.entity';
import { PaginationQueryDto } from '../common/paginationQueryDto';
import { CreatePatientAppointmentDto } from './dto/createPatientAppointment.dto';
import { IAppointment } from './interfaces/appointment.interface';
import { FindByDateDto } from './dto/findByDateDto.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
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


  async validateDate(date: Date){
    const newDate = new Date();
    newDate.setHours(-4, 0, 0);
    if(date < newDate){
      throw new ConflictException('Not valid date for this appointment')
    }
  }
  //crear planes de servicio y login primero antes de terminar esto.
  public async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ) {
    console.log('first flag');
    const nurseId = createAppointmentDto.nurseId
    const planServiceId = createAppointmentDto.plan_serviceId
    // Verificar si existe el usuario (paciente)
    const nurse = await this.userRepository.findOne({
      where: { userId: nurseId },
    });
    const plan = await this.planserviceRespository.findOne({
      where: { plan_serviceId: planServiceId },
    });
    console.log('existe el plan?', plan);
    console.log('usuario existe?', nurse);
    if (!nurse && !plan) {
      throw new NotFoundException(
        `User not found with ID ${nurseId} or Plan service not found ${planServiceId} `,
      );
    }
  const date = createAppointmentDto.date;
  console.log('fecha',date);
   this.validateDate(date)
  const findDate = await this.appointmentRepository.find({
    where: {
      date: date,
      nurse: { userId: nurseId }, // Asumiendo que nurseId es el ID del enfermero
      plan_service: { plan_serviceId: planServiceId }, // Asumiendo que plan.plan_serviceId es el ID del servicio de plan
    },
    relations: ['nurse', 'plan_service'],
  });
  console.log('nurseee', nurse)
   console.log('find date', findDate);
  if(findDate.length){
    throw new ConflictException('Date already taken for this appointment')
  }
  console.log('first flag')
    const appointment: CreateAppointmentDto = {
      status: status.PENDING,
      date: createAppointmentDto.date,
      plan_serviceId: planServiceId,
      nurseId: nurseId
    };
    const create =  this.appointmentRepository.create(appointment);
    console.log('creacion de cita', create);
  try{
      console.log('se cae?')
    const result = await this.appointmentRepository.save(create);
    console.log('resultado de la cita creada por la enfermera', result);
    return result;
  }catch(e){
    console.log(e);
    throw new ConflictException('Error to create appointment')
  }
}

  public async findAppointmentByDate(
    findByDateDto: FindByDateDto
  ): Promise<IAppointment[]> {
    const planServiceId = findByDateDto.plan_service.plan_serviceId
    console.log('id', planServiceId)
      const appointments = await this.appointmentRepository.find({
        where: {
          date: findByDateDto.date,
          status: 'pending',
          plan_service: {
            plan_serviceId: planServiceId
          } ,
        },
        relations: ['nurse', 'plan_service'],
      });
      console.log('cita', appointments.length)
      if(appointments.length === 0) {
        throw new NotFoundException('Not found appointments for this date');
      }
      const response: IAppointment[] = appointments.map((appointment) => ({
        appointmentId: appointment.appointmentId,
        date: appointment.date,
        status: appointment.status,
        planService: appointment.plan_service,
        nurse: appointment.nurse,
      }));

      return response;
  }

  //cambiar se necesita un body
  public async createAppointmentPatient(
    createPatientAppointmentDto: CreatePatientAppointmentDto
  ) {
    const patientId = createPatientAppointmentDto.patientId;
    console.log('id???',patientId)
    const selectedAppointmentId = createPatientAppointmentDto.appointmentId;
      const patient = await this.userRepository.findOne({
        where: { userId: patientId},
      });
      
      console.log('usuario final porfis', patient)
      if (!patient) {
        throw new NotFoundException(`Patient not found with Id ${patientId}`);
      }
  
      const appointment = await this.appointmentRepository.findOne({
        where: { appointmentId: selectedAppointmentId },
        relations: ['patient', 'nurse', 'plan_service'],
      });
      const date = appointment.date;
      if (!appointment) {
        throw new NotFoundException('Selected appointment not found');
      }
  
      if (appointment.status !== 'pending') {
        throw new ConflictException('Appointment is not pending');
      }
      console.log('fecha',date);
      //this.validateDate(date)
      appointment.patientId = patientId;
      appointment.status = 'confirmed'; // Cambia "status.CONFIMED" a "confirmed"
      console.log('usuario',patient)
      try {
      const result = await this.appointmentRepository.save(appointment);
  
      console.log('result?', result);
  
      return result;
    } catch (e) {
      throw new ConflictException('Error creating appointment', e.message);
    }
  }
  public async findAll(paginationQueryDto: PaginationQueryDto<Appointment>) {
    const { limit, offset, userId } = paginationQueryDto;
    const findOptions: any = {
      take: limit,
      skip: offset,
      relations: ['nurse', 'patient', 'plan_service'],
    };
  
    if (userId) {
      findOptions.where = [
        { patient: { userId: userId } },
        { nurseId: userId },
      ];
    }
  
    const [contacts, count] = await this.appointmentRepository.findAndCount(findOptions);
    return [contacts, count];
  }  
  
  public async findOne(appointmentId: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointmentId: appointmentId },
      relations: ['nurse', 'patient', 'plan_service'],
    });
    if (!appointment) {
      throw new NotFoundException(
        `Appointment not found with ID ${appointmentId} `,
      );
    }
    return appointment;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async expiredFreeSpin(){
    const newDate = new Date();
    newDate.setHours(-4, 0, 0);
    const findAppointment = await this.appointmentRepository.find({
      where: {
        status: In(['pending', 'confirmed']),
      },
    });
    if (findAppointment) {
      for (const appointment of findAppointment) {
        if (appointment.date < newDate) {
          appointment.status = 'expired';
          await this.appointmentRepository.save(appointment);
        }
      }
    } else {
      throw new NotFoundException('Appointment not found');
    }
  }
}

