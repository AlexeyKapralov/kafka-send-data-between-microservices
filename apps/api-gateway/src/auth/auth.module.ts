import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'BILLING_MICROSERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'billing',
      //       brokers: ['localhost:9092'],
      //     },
      //     producerOnlyMode: true,
      //     consumer: {
      //       groupId: 'billing-consumer',
      //     },
      //   },
      // },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
