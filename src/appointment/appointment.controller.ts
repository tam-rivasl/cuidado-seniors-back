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
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { Appointment } from './entities/appointment.entity';
import { number } from 'joi';
import { CreatePatientAppointmentDto } from './dto/createPatientAppointment.dto';
import { FindByDateDto } from './dto/findByDateDto.dto';

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
    //hacerlo despues
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
