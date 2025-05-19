import { KafkaOptions, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

export const kafkaOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: envs.kafka.brokers,
      clientId: envs.kafka.clientId,
    },
    consumer: {
      groupId: envs.kafka.groupId,
    },
    producer: {
      allowAutoTopicCreation: true,
    },
  },
};
