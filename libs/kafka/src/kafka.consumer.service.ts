import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@app/config';
import { KafkaProducer } from '@app/kafka/producer.service';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  KafkaMessage,
} from 'kafkajs';
import { KafkaConsumer } from '@app/kafka/consumer.service';

interface KafkaConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

export interface IConsumer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  consume: (message: any) => Promise<void>;
}

@Injectable()
export class KafkaConsumerService {
  private readonly consumers: IConsumer[] = [];

  constructor(private readonly configService: AppConfigService) {}

  async consume({ topic, config, onMessage }: KafkaConsumerOptions) {
    const consumer = new KafkaConsumer(
      { topic: this.configService.kafka.topic, fromBeginning: true },
      config,
      this.configService.kafka.broker,
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
