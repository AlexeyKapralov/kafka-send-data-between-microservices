import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from '../../api-gateway/src/app-gateway.dto';
import { PrismaServiceAuth } from '../../../prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaServiceAuth,
    @Inject('BILLING_MICROSERVICE') private readonly billingClient: ClientKafka,
  ) {}

  getHello(data: CreatePaymentDto): CreatePaymentDto {
    this.logger.log(data, 'i am in App Service in method getHello');
    return { userId: data.userId, price: data.price };
  }

  async createTestData(): Promise<void> {
    const result = await this.prisma.modelPSQL2.create({
      data: {
        model: 'lalala',
      },
      select: {
        id: true,
        model: true,
      },
    });

    const resultEvent = await firstValueFrom(
      this.billingClient.emit('add_data_in_billing', JSON.stringify(result)),
    );

    this.logger.log('createTestData event was done', resultEvent);
  }

  async onModuleInit() {
    await this.billingClient.connect();
  }
}
