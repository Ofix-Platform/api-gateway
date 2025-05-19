import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { KafkaModule } from './transports/kafka.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [HealthCheckModule, KafkaModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
