import { Logger, Module } from '@nestjs/common';
import { BillingMicroserviceController } from './billing-microservice.controller';
import { BillingMicroserviceService } from './billing-microservice.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaServiceBilling } from '../../../prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [BillingMicroserviceController],
  providers: [BillingMicroserviceService, Logger, PrismaServiceBilling],
})
export class BillingMicroserviceModule {}
