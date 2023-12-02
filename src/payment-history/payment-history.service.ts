import { Injectable } from '@nestjs/common';
import { CreatePaymentHistoryDto } from './dto/create-payment-history.dto';
import { UpdatePaymentHistoryDto } from './dto/update-payment-history.dto';

//debido a que no se realizo la integracon con pagos no se realizo
//atte. tamara Rivas
@Injectable()
export class PaymentHistoryService {
  create(createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return 'This action adds a new paymentHistory';
  }

  findAll() {
    return `This action returns all paymentHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentHistory`;
  }

  update(id: number, updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    return `This action updates a #${id} paymentHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentHistory`;
  }
}
