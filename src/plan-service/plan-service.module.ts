import { Module } from '@nestjs/common';
import { PlanServiceService } from './plan-service.service';
import { PlanServiceController } from './plan-service.controller';
import { PlanService } from './entities/planService.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanService, Appointment])],
  controllers: [PlanServiceController],
  providers: [PlanServiceService],
})
export class PlanServiceModule {}
