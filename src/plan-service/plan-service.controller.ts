import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanServiceService } from './plan-service.service';
import { CreatePlanServiceDto } from './dto/create-plan-service.dto';
import { UpdatePlanServiceDto } from './dto/update-plan-service.dto';

@Controller('plan-service')
export class PlanServiceController {
  constructor(private readonly planServiceService: PlanServiceService) {}

  @Post()
  create(@Body() createPlanServiceDto: CreatePlanServiceDto) {
    return this.planServiceService.create(createPlanServiceDto);
  }

  @Get()
  findAll() {
    return this.planServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planServiceService.findOne(+id);
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
