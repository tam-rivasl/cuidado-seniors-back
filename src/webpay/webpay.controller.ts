// webpay.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { WebPayService } from './webpay.service';
import { CreateTransactionDto } from './dto/webpay.dto';

@Controller('webpay')
export class WebPayController {
  constructor(private readonly webpayService: WebPayService) {}

  @Post('create-transaction')
  async createTransaction(
    @Body() data: CreateTransactionDto,
    ) {
    try {
      const result = await this.webpayService.createTransaction(data);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
