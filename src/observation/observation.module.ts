import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observation])],
  controllers: [ObservationController],
  providers: [ObservationService],
})
export class ObservationModule {}
