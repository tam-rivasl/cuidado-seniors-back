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
  async create(@Body() createPlanServiceDto: CreatePlanServiceDto) {
    return this.planServiceService.create(createPlanServiceDto);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto<PlanService>) {
    return this.planServiceService.findAll(paginationQueryDto);
  }

  @Get(':planServiceId')
  findOne(@Param('planServiceId', ParseIntPipe) planServiceId: number) {
    return this.planServiceService.findOne(planServiceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanServiceDto: UpdatePlanServiceDto) {
    return this.planServiceService.update(+id, updatePlanServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planServiceService.remove(+id);
  }
}
