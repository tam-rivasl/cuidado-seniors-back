import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanServiceDto } from './dto/create-plan-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanService, status } from './entities/planService.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/paginationQueryDto';

@Injectable()
export class PlanServiceService {
  constructor(
    @InjectRepository(PlanService)
    private readonly planserviceRepository: Repository<PlanService>,
  ) {}
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
    try {
      const result = await this.planserviceRepository.save(plan);
      return result;
    } catch (e) {
      console.log("error", e, "mensaje?", e.message)
      throw new ConflictException('error al crear servicio consulte con soporte', e.message);
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto<PlanService>) {
    try {
      const { limit, offset } = paginationQueryDto;
      const plan = await this.planserviceRepository.find({
        take: limit,
        skip: offset,
      });
      return plan;
    } catch (e) {
      throw new NotFoundException('Plan service no encontrado', e.message);
    }
  }

  async findOne(planserviceId: number) {
    const plan = await this.planserviceRepository.findOne({
      where: { plan_serviceId: planserviceId },
    });
    if (!plan) {
      throw new NotFoundException('Plan service no encontrado');
    }
    return plan;
  }
  // TODO: VER DESPUES ESTO

  public async inactivePlan(planServiceId: number) {
    console.log('flagada');
    const plan = await this.planserviceRepository.findOne({
      where: {
        plan_serviceId: planServiceId,
      },
    });
    console.log('plan service', plan);
    if (!plan) {
      console.log('flag1');
      throw new NotFoundException('Plan de servicio no encontrado');
    }
    if (plan.status === 'inactive') {
      console.log('flag2');
      throw new NotFoundException('Plan de servicio ya se encuentra inactivo');
    }
    const result = await this.planserviceRepository.save({
      plan_serviceId: planServiceId,
      status: status.INACTIVE,
    });
    console.log('flag3', result);
    return result;
  }

  public async activePlan(planServiceId: number) {
    console.log('flag1')
    const plan = await this.planserviceRepository.findOne({
      where: {
        plan_serviceId: planServiceId,
      },
    });
    console.log('flag2', plan);
    if (!plan) {
      console.log('flag3')
      throw new NotFoundException('Plan de servicio no encontrado');
    }
    if (plan.status === 'active') {
      console.log('flag4')
      throw new NotFoundException('Plan de servicio ya se encuentra activo');
    }
    const result = await this.planserviceRepository.save({
      plan_serviceId: planServiceId,
      status: status.ACTIVE,
    });
    console.log('flag5', result)
    return result;
  }
}
