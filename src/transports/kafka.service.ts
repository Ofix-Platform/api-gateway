import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaOptions } from './options/kafka.options';
import { KAFKA_TOPICS } from 'src/config';

@Injectable()
export class KafkaService extends ClientKafka implements OnModuleInit {
  logger = new Logger(KafkaService.name);

  constructor() {
    // Log complete kafka options before initializing
    const options = {
      client: kafkaOptions.options.client,
      consumer: kafkaOptions.options.consumer,
      producer: kafkaOptions.options.producer,
    };

    super(options);
  }

  async onModuleInit() {
    try {
      const topics = [KAFKA_TOPICS.ORDERS.CREATE];
      this.logger.log(`Subscribing to topics: ${topics.join(', ')}`);

      topics.forEach((topic) => {
        this.logger.debug(`Attempting to subscribe to topic: ${topic}`);
        this.subscribeToResponseOf(topic); // Remove the object wrapper
      });

      this.logger.log('Connecting to Kafka...');
      await this.connect();
      this.logger.log('Successfully connected to Kafka');
    } catch (error) {
      this.logger.error(`Failed to initialize Kafka: ${error.message}`, error.stack);
      throw error;
    }
  }

  
}
