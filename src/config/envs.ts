import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  KAFKA_BROKERS: string[];
  KAFKA_GROUP_ID: string;
  KAFKA_CLIENT_ID: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    KAFKA_BROKERS: joi.array().items(joi.string()).required(),
    KAFKA_GROUP_ID: joi.string().required(),
    KAFKA_CLIENT_ID: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  KAFKA_BROKERS: process.env.KAFKA_BROKERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
   kafka: {
    brokers: envVars.KAFKA_BROKERS,
    groupId: envVars.KAFKA_GROUP_ID,
    clientId: envVars.KAFKA_CLIENT_ID,
  }
};
