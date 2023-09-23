import { Module } from '@nestjs/common';
import { PlanServiceService } from './plan-service.service';
import { PlanServiceController } from './plan-service.controller';
import { PlanService } from './entities/planService.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlanService])],
  controllers: [PlanServiceController],
  providers: [PlanServiceService],
})
export class PlanServiceModule {}
