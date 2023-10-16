import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
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
    @InjectRepository(Appointment)
    private readonly userRepository: Repository<User>,
  ) {}

  //crear planes de servicio y login primero antes de terminar esto.
  public async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    nurseId: number,
    userId: number,
    plan_serviceId,
  ) {
    // Verificar si existe el usuario (paciente)
    const user = await this.userRepository.findOne({
      where: { userId: userId },
      relations: ['columns', 'patient_appointment'],
    });
    console.log('join user', user);
    if (!user) {
      throw new NotFoundException(`User not found with ID ${userId}.`);
    }

    // Verificar si existe la enfermera
    const nurse = await this.userRepository.findOne({
      where: { userId: nurseId },
      relations: ['nurse_appointment'],
    });
    console.log('join nurseId', nurse);
    if (!nurse) {
      throw new NotFoundException(`Enfermera con ID ${nurseId} no encontrada.`);
    }
    if (nurseId) {
      const appointment = this.appointmentRepository.create({
        status: createAppointmentDto.status,
        date: createAppointmentDto.date,
        nurse: nurse,
        plan_service: plan_serviceId,
      });
      return await this.appointmentRepository.save(appointment);
      // Crear la cita si tanto el usuario como la enfermera existen
    }
    if (userId != nurseId) {
      if (nurseId & userId) {
        const appointment = this.appointmentRepository.create({
          status: createAppointmentDto.status,
          date: createAppointmentDto.date,
          patient: user,
          nurse: nurse,
          plan_service: plan_serviceId,

        });
        return await this.appointmentRepository.save(appointment);
      }
    }
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
