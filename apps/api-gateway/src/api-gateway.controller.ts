import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreatePaymentDto, CreateUserDto } from './app-gateway.dto';
import { KafkaProducerService } from '@app/kafka/kafka.producer.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly producerService: KafkaProducerService,
    private readonly authService: AuthService,
    private readonly apiGatewayService: ApiGatewayService,
  ) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  // @Post()
  // createOrderEvent(@Body() payload: CreateOrderDto) {
  //   this.apiGatewayService.createOrderEvent(payload);
  // }

  @Post('kafka')
  kafkaTest(@Body() payload: CreatePaymentDto) {
    return this.producerService.produce(JSON.stringify(payload));
  }

  @Post('go_to_auth')
  goToAuthMicro(@Body() payload: CreateUserDto) {
    return this.authService.createUser(payload);
  }
}
