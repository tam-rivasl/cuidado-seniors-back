import { Module } from '@nestjs/common';
import { PaymentHistoryService } from './payment-history.service';
import { PaymentHistoryController } from './payment-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistory } from './entities/paymentHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentHistory])],
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
