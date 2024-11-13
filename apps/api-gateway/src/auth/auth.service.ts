import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '../app-gateway.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const result = await firstValueFrom(
      this.authClient.emit('create_user', JSON.stringify(createUserDto)),
    );

    console.log('Message sent successfully', result);
  }
}
