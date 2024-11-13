import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '../../api-gateway/src/app-gateway.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  async createUser(@Payload() data: CreatePaymentDto): Promise<void> {
    const result = await this.appService.createTestData();
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload() data: CreatePaymentDto) {
    return this.appService.getHello(data);
  }
}
