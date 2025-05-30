import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderStatus } from 'src/constants/purchase_order_status';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PurchaseOrderDetail } from './entities/purchase_order_detail.entity';
import { PurchaseOrder } from '../purchase/entities/purchase.entity';

@Injectable()
export class PurchaseDetailService {
  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async updateQuantity(id: number, quantity: number): Promise<UpdateResult> {
    const purchaseOrderDetail =
      await this.purchaseOrderDetailRepository.findOneBy({
        id,
      });
    if (!purchaseOrderDetail) {
      throw new NotFoundException(
        `PurchaseOrderDetail with ID ${id} not found`,
      );
    }
    const purchaseOrder = await this.purchaseOrderRepository.findOneBy({
      id: purchaseOrderDetail.purchaseOrder.id,
    });

    if (purchaseOrder?.status !== PurchaseOrderStatus.PENDING) {
      throw new BadRequestException(
        `Cannot update quantity. PurchaseOrder status must be PENDING, current status is ${purchaseOrder?.status}`,
      );
    }
    return await this.purchaseOrderDetailRepository.update(id, { quantity });
  }
}
