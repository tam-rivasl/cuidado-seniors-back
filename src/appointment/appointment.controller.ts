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

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('nurseId/:nurseId/planServiceId/:planServiceId')
  async createAppointment(
    @Param('nurseId', ParseIntPipe) nurseId: number,
    @Param('planServiceId', ParseIntPipe) planServiceId: number,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.createAppointment(
      createAppointmentDto,
      nurseId,
      planServiceId,
    );
  }

  @Post('patientId/:patientId/appointmentId/:appointmentId/create')
  async createAppointmentPatient(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.appointmentService.createAppointmentPatient(
      patientId,
      appointmentId,
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
