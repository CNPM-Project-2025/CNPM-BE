import { Injectable } from '@nestjs/common';
// import PayOS from '@payos/node';
import PayOS = require('@payos/node');

import * as crypto from 'crypto';


@Injectable()
export class PaymentService {
  private readonly payos: PayOS;

  constructor() {
    this.payos = new PayOS(
      process.env.PAYOS_CLIENT_ID!,
      process.env.PAYOS_API_KEY!,
      process.env.PAYOS_CHECKSUM_KEY!
    );
    console.log('PayOS initialized with client ID:', process.env.PAYOS_CLIENT_ID);
    console.log('PayOS initialized with API key:', process.env.PAYOS_API_KEY);
    console.log('PayOS initialized with checksum key:', process.env.PAYOS_CHECKSUM_KEY);
  }

  async createPaymentLink(amount: number, orderCode: number) {
    return this.payos.createPaymentLink({
      orderCode,
      amount,
      description: `Thanh toán đơn hàng #${orderCode}`,
      returnUrl: process.env.URL_SUCCESS ?? '',
      cancelUrl: process.env.URL_FAILURE ?? '',
    });
  }

  async getPaymentStatus(orderCode: number) {
    return this.payos.getPaymentLinkInformation(orderCode);
  }

  async cancelPayment(orderCode: number) {
    return this.payos.cancelPaymentLink(orderCode);
  }


  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY!;
    const computedSignature = crypto
      .createHmac('sha256', checksumKey)
      .update(rawBody)
      .digest('hex');
    return computedSignature === signature;
  }
}
