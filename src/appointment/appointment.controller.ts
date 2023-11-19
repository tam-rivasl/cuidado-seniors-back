import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { Appointment } from './entities/appointment.entity';
import { CreatePatientAppointmentDto } from './dto/createPatientAppointment.dto';
import { FindByDateDto } from './dto/findByDateDto.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create/appointment')
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.createAppointment(
      createAppointmentDto,
    );
  }
//mejorar
  @Post('assign/appointment')
  async createAppointmentPatient(
    @Body() createPatientAppointmentDto: CreatePatientAppointmentDto,
  ) {
    return this.appointmentService.createAppointmentPatient(
      createPatientAppointmentDto,
    );
  }

  @Get()
 async findAll(
    @Query() paginationQueryDto: PaginationQueryDto<Appointment>
  ) {
    return this.appointmentService.findAll(paginationQueryDto);
  }


  @Get(':appointmentId')
  findOne(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return this.appointmentService.findOne(appointmentId);
  }

  @Post('/byDate')
  findAppointmentByDate(@Body() findByDateDto: FindByDateDto) {
    return this.appointmentService.findAppointmentByDate(findByDateDto);
  }

  
  @Patch('/update')
  cancelAppointment(@Body() updateAppointment: UpdateAppointmentDto) {
    return this.appointmentService.cancelAppointment(updateAppointment);
  }
    
}
