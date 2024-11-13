import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { KafkaModule } from '@app/kafka';
import { TestConsumer } from './consumer';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [AuthModule, BillingModule, KafkaModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, TestConsumer],
})
export class ApiGatewayModule {}
