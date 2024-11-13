import { Test, TestingModule } from '@nestjs/testing';
import { BillingMicroserviceController } from './billing-microservice.controller';
import { BillingMicroserviceService } from './billing-microservice.service';

describe('BillingMicroserviceController', () => {
  let billingMicroserviceController: BillingMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingMicroserviceController],
      providers: [BillingMicroserviceService],
    }).compile();

    billingMicroserviceController = app.get<BillingMicroserviceController>(BillingMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
