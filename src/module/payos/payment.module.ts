import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BillService } from '../bill/bill.service';
import { BillModule } from '../bill/bill.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
  imports: [BillModule],
})
export class PaymentModule {}
