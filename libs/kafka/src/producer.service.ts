import { IProducer } from '@app/kafka/kafka.producer.service';
import { Kafka, Producer } from 'kafkajs';
import { Logger } from '@nestjs/common';

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export class KafkaProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: string,
    private readonly broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka. Trying again ...', err);
      await sleep(5000);
      await this.connect();
    }
  }
  async disconnect() {
    await this.producer.disconnect();
  }

  async produce(message: any) {
    console.log('i am in produce method from kafka producer');
    console.log('message', message);
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: message }],
    });
  }
}
