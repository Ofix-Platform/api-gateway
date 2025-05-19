import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaOptions } from './options/kafka.options';
import { KAFKA_TOPICS } from 'src/config';

@Injectable()
export class KafkaService extends ClientKafka implements OnModuleInit {
  constructor() {
    super({
      client: kafkaOptions.options.client,
      consumer: kafkaOptions.options.consumer,
      producer: kafkaOptions.options.producer,
    });
  }

  async onModuleInit() {
    const topics = [KAFKA_TOPICS.ORDERS.CREATE];

    topics.forEach((topic) => this.subscribeToResponseOf({ topic }));
    await this.connect();
  }
}
