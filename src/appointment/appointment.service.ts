import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
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
import moment from 'moment';
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

  async validateDate(date: Date) {
    const newDate = new Date();
    newDate.setHours(-4, 0, 0);
    console.log('fecha', date)
    console.log(newDate, 'new date')
    if (date < newDate) {
      console.log('se cae aqui')
      throw new ConflictException('Fecha invalida, porfavor ingrese una fecha mayor a la de hoy');
    }
  }
  //crear planes de servicio y login primero antes de terminar esto.
  public async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    console.log('first flag');
    const nurseId = createAppointmentDto.nurseId;
    const planServiceId = createAppointmentDto.plan_serviceId;
    // Verificar si existe el usuario (paciente)
    const nurse = await this.userRepository.findOne({
      where: { userId: nurseId },
    });
    const plan = await this.planserviceRespository.findOne({
      where: { 
        plan_serviceId: planServiceId,
      },
    });
    console.log('existe el plan?', plan);
    console.log('usuario existe?', nurse);
    if (!nurse && !plan) {
      throw new NotFoundException(
        `User not found with ID ${nurseId} or Plan service not found ${planServiceId} `,
      );
    }
    console.log('status', plan.status)
    if(plan.status === 'inactive'){
      console.log('deberia entrar aqui');
      throw new ConflictException('Lo sentimos, este plan esta desactivado');
    }
    const date = createAppointmentDto.date;
    console.log('fecha', date);
    await this.validateDate(date);
    const findDate = await this.appointmentRepository.find({
      where: {
        date: date,
        nurse: { userId: nurseId }, // Asumiendo que nurseId es el ID del enfermero
        plan_service: { plan_serviceId: planServiceId }, // Asumiendo que plan.plan_serviceId es el ID del servicio de plan
      },
      relations: ['nurse', 'plan_service'],
    });
    console.log('nurseee', nurse);
    console.log('find date', findDate);
    if (findDate.length) {
      console.log('tiene mas de una fecha ')
      throw new ConflictException('Ya tiene una cita agendada para esta fecha');
    }
    console.log('first flag');
    const appointment: CreateAppointmentDto = {
      status: status.PENDING,
      date: createAppointmentDto.date,
      plan_serviceId: planServiceId,
      nurseId: nurseId,
    };
    const create = this.appointmentRepository.create(appointment);
    console.log('creacion de cita', create);
    try {
      console.log('se cae?');
      const result = await this.appointmentRepository.save(create);
      console.log('resultado de la cita creada por la enfermera', result);
      return result;
    } catch (e) {
      console.log(e);
      throw new ConflictException('Error to create appointment');
    }
  }

  public async findAppointmentByDate(
    findByDateDto: FindByDateDto,
  ): Promise<IAppointment[]> {
    const planServiceId = findByDateDto.plan_serviceId;
    console.log('id', planServiceId);
    const date = findByDateDto.date;
    console.log(date);
    const appointments = await this.appointmentRepository.find({
      where: {
        date: findByDateDto.date,
        status: 'pending',
        plan_serviceId: planServiceId,
      },
      relations: ['nurse', 'plan_service'],
    });
    console.log(appointments, 'fin by date');
    console.log('cita', appointments.length);
    if (appointments.length === 0) {
      throw new NotFoundException('Not found appointments for this date');
    }
    const response: IAppointment[] = appointments.map((appointment) => ({
      appointmentId: appointment.appointmentId,
      date: appointment.date,
      status: appointment.status,
      planServiceId: appointment.plan_serviceId,
      nurse: appointment.nurse,
    }));

    return response;
  }

  //cambiar se necesita un body
  public async createAppointmentPatient(
    createPatientAppointmentDto: CreatePatientAppointmentDto,
  ) {
    const patientId = createPatientAppointmentDto.patientId;
    console.log('id???', patientId);
    const selectedAppointmentId = createPatientAppointmentDto.appointmentId;
    console.log(selectedAppointmentId, 'id servicio');
    const patient = await this.userRepository.findOne({
      where: { userId: patientId },
    });

    console.log('usuario final porfis', patient);
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
    console.log('fecha', date);
    await this.validateDate(date)
    appointment.patientId = patientId;
    appointment.status = 'confirmed'; // Cambia "status.CONFIMED" a "confirmed"
    console.log('usuario', patient);
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

    const [contacts, count] =
      await this.appointmentRepository.findAndCount(findOptions);
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
  async expiredFreeSpin() {
    const newDate = new Date();
    newDate.setHours(-4, 0, 0);
    const findAppointment = await this.appointmentRepository.find({
      where: {
        status: In(['pending', 'confirmed']),
      },
    });
    if (findAppointment) {
      for (const appointment of findAppointment) {
        if (appointment.status === 'pending' && appointment.date < newDate) {
          appointment.status = 'expired';
          await this.appointmentRepository.save(appointment);
        }
        if (appointment.status === 'confirmed' && appointment.date < newDate) {
          appointment.status = 'finished';
          await this.appointmentRepository.save(appointment);
        }
      }
    } else {
      throw new NotFoundException('Appointment not found');
    }
  }

  public async cancelAppointment(appointmentId: number) {
    try {
      console.log('flag1');
      // const appointmentId = updateAppointmentDto.appointmentId;

      if (!appointmentId) {
        console.error('Invalid appointmentId:', appointmentId);
        throw new BadRequestException('Invalid appointmentId');
      }

      console.log('flag1.1'); // Agrega logs adicionales
      const appointment = await this.appointmentRepository.findOne({
        where: {
          appointmentId: appointmentId,
        },
      });

      console.log('find', appointment);
      console.log('flag2');

      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }

      console.log('flag3');

      if (
        appointment.status === 'cancelled' ||
        appointment.status === 'expired'
      ) {
        console.log('flag 5');
        throw new ConflictException(
          'Appointment is already cancelled or expired',
        );
      } else {
        const save = await this.appointmentRepository.save({
          ...appointment,
          status: status.CANCELLED,
        });
        console.log('flag5', save);
        return save;
      }
    } catch (error) {
      console.error('Error in cancelAppointment:', error);
      throw error;
    }
  }
}
