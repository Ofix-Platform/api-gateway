import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { envs } from 'src/config';

export const kafkaOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: envs.kafka.clientId,
      brokers: envs.kafka.brokers,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    },
    consumer: {
      groupId: envs.kafka.groupId,
    },
    producer: {
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.LegacyPartitioner,
    },
    subscribe: {
      fromBeginning: true,
    },
  },
};
