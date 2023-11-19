import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePlanServiceDto } from './dto/create-plan-service.dto';
import { UpdatePlanServiceDto } from './dto/update-plan-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanService, status } from './entities/planService.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/paginationQueryDto';

@Injectable()
export class PlanServiceService {
  constructor(
    @InjectRepository(PlanService)
    private readonly planserviceRepository: Repository<PlanService>
  ){}
 public async create(createPlanServiceDto: CreatePlanServiceDto) {
    const plan: CreatePlanServiceDto = {
      planServiceName: createPlanServiceDto.planServiceName,
      price: createPlanServiceDto.price,
      description: createPlanServiceDto.description,
      startTime: createPlanServiceDto.startTime,
      endTime: createPlanServiceDto.endTime,
      status: createPlanServiceDto.status,
    };
     this.planserviceRepository.create(plan);
    try{
    const result =  await this.planserviceRepository.save(plan);
    return result;
    }catch(e){
      throw new ConflictException('error to create plan service', e.message)
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto<PlanService>) {
   try{
    const { limit, offset } = paginationQueryDto;
    const plan = await this.planserviceRepository.find({
      take: limit,
      skip: offset,
    })
    return plan
  }catch(e){
    throw new NotFoundException('Plan service not found', e.message)
  }
  }

  async findOne(planserviceId: number) {
     const plan = await this.planserviceRepository.findOne({where:{plan_serviceId: planserviceId}})
    if(!plan){
      throw new NotFoundException('Plan service not found');
    }
  }
// TODO: VER DESPUES ESTO
  
public async updateStatus(updatePlanServiceDto: UpdatePlanServiceDto) {
  const planServiceId = updatePlanServiceDto.planServiceId;
  const plan = await this.planserviceRepository.findOne({
    where: {
      plan_serviceId: planServiceId,
    },
  });
  if(!plan){
    throw new NotFoundException('Plan Service not found')
  }
  await this.planserviceRepository.preload({
    plan_serviceId: planServiceId,
    status: status.INACTIVE,
  })
}
 
}
