import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PlanServiceService } from './plan-service.service';
import { CreatePlanServiceDto } from './dto/create-plan-service.dto';
import { UpdatePlanServiceDto } from './dto/update-plan-service.dto';
import { string } from 'joi';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { remove } from 'winston';
import { PlanService } from './entities/planService.entity';

@Controller('plan-service')
export class PlanServiceController {
  constructor(private readonly planServiceService: PlanServiceService) {}

  @Post()
 public async create(@Body() createPlanServiceDto: CreatePlanServiceDto) {
    return this.planServiceService.create(createPlanServiceDto);
  }

  @Get()
 public async findAll(
    @Query() paginationQueryDto: PaginationQueryDto<PlanService>) {
    return this.planServiceService.findAll(paginationQueryDto);
  }

  @Get(':planServiceId')
  public async findOne(@Param('planServiceId', ParseIntPipe) planServiceId: number) {
    return this.planServiceService.findOne(planServiceId);
  }

  @Patch('inactive/:planServiceId')
 public async inactivePlan( @Param('planServiceId', ParseIntPipe) planServiceId: number) {
    return this.planServiceService.inactivePlan(planServiceId);
  }

  @Patch('active/:planServiceId')
  public async activePlan( @Param('planServiceId', ParseIntPipe) planServiceId: number) {
     return this.planServiceService.activePlan(planServiceId);
   }
}
