import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationDto } from './dto/create-observation.dto';
import { Observation } from './entities/observation.entity';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';

@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post('patientId/:patientId')
  async createObservationPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() observationDto: ObservationDto
    ) {
    return this.observationService.createObservationPatient(observationDto, patientId);
  }
  @Post('nurseId/:nurseId/patientId/:patientId')
  async createObservationNurse(
    @Param('nurseId', ParseIntPipe) nurseId: number,
    @Param('patientId', ParseIntPipe) patientId: number,
    @Body() observationDto: ObservationDto
    ) {
    return this.observationService.createObservationNurse(observationDto, nurseId, patientId);
  }
  @Get('patientId/:patientId')
  findByPatientId(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Query() paginationQueryDto: PaginationQueryDto<Observation>
  ) {
    return this.observationService.findByPatientId(patientId, paginationQueryDto);
  }
}
