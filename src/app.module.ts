import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [HealthCheckModule, KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
