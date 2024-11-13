import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
  Producer,
} from 'kafkajs';
import { Logger } from '@nestjs/common';
import { IConsumer } from '@app/kafka/kafka.consumer.service';
import retry from 'async-retry';

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export class KafkaConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    private readonly config: ConsumerConfig,
    private readonly broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topic}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partitions: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) => {
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              );
            },
          });
        } catch (err) {
          //обработка ошибки сообщения
          //запись в бд например или логирование
        }
      },
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka. Trying again ...', err);
      await sleep(5000);
      await this.connect();
    }
  }
  async disconnect() {
    await this.consumer.disconnect();
  }
}
