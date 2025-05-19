import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { KafkaModule } from 'src/transports/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
