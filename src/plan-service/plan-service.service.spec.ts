import { Test, TestingModule } from '@nestjs/testing';
import { PlanServiceService } from './plan-service.service';

describe('PlanServiceService', () => {
  let service: PlanServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanServiceService],
    }).compile();

    service = module.get<PlanServiceService>(PlanServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
