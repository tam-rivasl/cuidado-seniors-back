import { ConflictException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto-browserify';
import axios, { AxiosResponse } from 'axios';
import { CreateTransactionDto } from './dto/webpay.dto';

@Injectable()
export class WebPayService {
  private readonly webpayApiUrl = 'https://webpay3gint.transbank.cl';

  async createTransaction(data: CreateTransactionDto) {
    console.log('1')
    const url = `${this.webpayApiUrl}/rswebpaytransaction/api/webpay/v1.0/transactions`;
    const dataCreate = {
      buy_order: data.buyOrder,
      session_id: data.sessionId,
      amount: {
        currency: 'CLP',
        total: data.amount,
      },
    };

    const signature = this.generateSignature(JSON.stringify(dataCreate));

    try {
      const response: AxiosResponse = await axios.post(url, dataCreate, {
        headers: {
          'Content-Type': 'application/json',
          'Tbk-Api-Key-Id': process.env.WEBPAY_API_KEY,
          'Tbk-Api-Key-Sign': signature,
        },
      });

      return response;
    } catch (error) {
        console.log('error:', error)
      throw new ConflictException(`Error en la transacción: ${error.message}`);
    }
  }

  private generateSignature(dataCreate: string): string {
    console.log('1 generate')
    const secretKey = process.env.WEBPAY_API_SECRET || '';
    const sign = crypto.createHmac('sha256', secretKey);
    sign.update(dataCreate);
    console.log('2 generate')
    return sign.digest('hex');
  }
}
