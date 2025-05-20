import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BillService } from '../bill/bill.service';

@Module({
  providers: [PaymentService, BillService],
  controllers: [PaymentController],
  exports: [PaymentService],
  // imports: [BillService],
})
export class PaymentModule {}
