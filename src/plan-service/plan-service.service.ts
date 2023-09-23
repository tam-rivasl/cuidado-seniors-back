import { Injectable } from '@nestjs/common';
import { CreatePlanServiceDto } from './dto/create-plan-service.dto';
import { UpdatePlanServiceDto } from './dto/update-plan-service.dto';

@Injectable()
export class PlanServiceService {
  create(createPlanServiceDto: CreatePlanServiceDto) {
    return 'This action adds a new planService';
  }

  findAll() {
    return `This action returns all planService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planService`;
  }

  update(id: number, updatePlanServiceDto: UpdatePlanServiceDto) {
    return `This action updates a #${id} planService`;
  }

  remove(id: number) {
    return `This action removes a #${id} planService`;
  }
}
