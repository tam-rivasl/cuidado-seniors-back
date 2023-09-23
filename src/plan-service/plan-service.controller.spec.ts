import { Test, TestingModule } from '@nestjs/testing';
import { PlanServiceController } from './plan-service.controller';
import { PlanServiceService } from './plan-service.service';

describe('PlanServiceController', () => {
  let controller: PlanServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanServiceController],
      providers: [PlanServiceService],
    }).compile();

    controller = module.get<PlanServiceController>(PlanServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
