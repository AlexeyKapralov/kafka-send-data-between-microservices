import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePaymentDto } from '../../api-gateway/src/app-gateway.dto';
import { PrismaServiceBilling } from '../../../prisma/prisma.service';

@Injectable()
export class BillingMicroserviceService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
    private readonly prisma: PrismaServiceBilling,
    private logger: Logger,
  ) {}

  processPayment(makePaymentDto: CreatePaymentDto) {
    const { userId, price } = makePaymentDto;
    console.log('process payment');
    this.authClient
      .send('get_user', JSON.stringify({ userId }))
      .subscribe((user: CreatePaymentDto) => {
        console.log(
          `process payment for user ${user.userId} - amount: ${price}`,
        );
      });
  }

  async writeDataFromAuth(data: { id: number; model: string }) {
    const { id, model } = data;
    await this.prisma.modelPSQL1.create({
      data: {
        id: id,
        model: model,
      },
    });
    this.logger.log('data from write data from auth method');
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
