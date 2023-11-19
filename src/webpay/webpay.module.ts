// webpay.module.ts
import { Module } from '@nestjs/common';
import { WebPayController } from './webpay.controller';
import { WebPayService } from './webpay.service';
import { WebPayTransaction } from './entities/webpay.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([WebPayTransaction])],
  controllers: [WebPayController],
  providers: [WebPayService],
})
export class WebPayModule {}
