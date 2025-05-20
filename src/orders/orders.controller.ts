import { Controller, Post, Body, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { KafkaService } from 'src/transports/kafka.service';
import { firstValueFrom } from 'rxjs';
import { KAFKA_TOPICS } from 'src/config';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger('OrdersController');
  constructor(private readonly transportClient: KafkaService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.log('Sending create order request to Kafka');
    this.logger.log(`Creating order: ${JSON.stringify(createOrderDto)}`);

    try {
      const result = await firstValueFrom(
        this.transportClient.send(KAFKA_TOPICS.ORDERS.CREATE, createOrderDto),
      );

      this.logger.log(`Order created successfully: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`);
      throw error;
    }
  }
}
