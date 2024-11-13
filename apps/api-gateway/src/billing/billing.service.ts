import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePaymentDto } from '../app-gateway.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject('BILLING_MICROSERVICE') private readonly billingClient: ClientKafka,
  ) {}
  makePayment(createPaymentDto: CreatePaymentDto) {
    console.log('billing Service', createPaymentDto);
    this.billingClient.emit('make_payment', JSON.stringify(createPaymentDto));
  }
}
