import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './app-gateway.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created';

@Injectable()
export class ApiGatewayService {
  // constructor(
  //   @Inject('BILLING_MICROSERVICE')
  //   private readonly billingProxyClient: ClientKafka,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }
  // createOrderEvent(payload: CreateOrderDto) {
  //   this.billingProxyClient.emit(
  //     'order_created',
  //     new OrderCreatedEvent('123', payload.userId, payload.price),
  //   );
  // }
}
