import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationDto } from './dto/create-observation.dto';
import { Observation } from './entities/observation.entity';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';

@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post('create/observation')
  async createObservationPatient(
    @Body() observationDto: ObservationDto
    ) {
    return this.observationService.createObservationPatient(observationDto);
  }
  @Get('appointmentId/:appointmentId')
  findByPatientId(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Query() paginationQueryDto: PaginationQueryDto<Observation>
  ) {
    return this.observationService.findByAppointmentId(appointmentId, paginationQueryDto);
  }
}
