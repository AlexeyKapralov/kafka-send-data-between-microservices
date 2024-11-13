import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from '@app/kafka/kafka.consumer.service';
import { AppConfigService } from '@app/config';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly config: AppConfigService,
    private readonly consumer: KafkaConsumerService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume({
      topic: { topic: this.config.kafka.topic },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log('aaa', { value: message.value.toString() });
      },
    });
  }
}
