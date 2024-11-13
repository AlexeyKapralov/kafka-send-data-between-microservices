import { Body, Controller, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreatePaymentDto } from '../app-gateway.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('pay')
  makePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.billingService.makePayment(createPaymentDto);
  }
}
