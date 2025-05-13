import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseDetailController } from './purchase_detail.controller';

describe('PurchaseDetailController', () => {
  let controller: PurchaseDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseDetailController],
    }).compile();

    controller = module.get<PurchaseDetailController>(PurchaseDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
