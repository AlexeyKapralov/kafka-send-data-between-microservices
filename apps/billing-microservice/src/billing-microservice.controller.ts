import { Controller } from '@nestjs/common';
import { BillingMicroserviceService } from './billing-microservice.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '../../api-gateway/src/app-gateway.dto';

@Controller()
export class BillingMicroserviceController {
  constructor(
    private readonly billingMicroserviceService: BillingMicroserviceService,
  ) {}

  @EventPattern('make_payment')
  handleProcessPayment(@Payload() data: CreatePaymentDto) {
    console.log('data', data);
    this.billingMicroserviceService.processPayment(data);
    console.warn('data from billing app with using kafka', data);
  }

  @EventPattern('add_data_in_billing')
  async getDataFromAuthMicro(@Payload() data: { id: number; model: string }) {
    await this.billingMicroserviceService.writeDataFromAuth(data);
    console.warn('data from billing app with using kafka', data);
  }
}
