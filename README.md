# Orders Microservice

This is a NestJS microservice that handles order management using Kafka for messaging and PostgreSQL for data storage.

## Prerequisites

- Node.js 16 or higher
- Docker and Docker Compose (for Kafka)
- PostgreSQL database (we're using Neon)
- npm or yarn package manager

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd orders-ms
```

2. Create a `.env` file in the root directory:
```env
PORT=3000     
 
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=orders-consumer-group
KAFKA_CLIENT_ID=api-gateway
```

## Kafka Setup

1. Make sure Kafka is running on your local machine:
```bash
# Check if Kafka is running
nc -zv localhost:9092
```

2. If you need to start Kafka, you can use Docker Compose:
```bash
docker-compose up -d
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the application in development mode:
```bash
npm run start:dev
```

3. The service will be running on port 3001 and will be listening to Kafka topics:
- `orders.create` - For creating new orders

## API Testing

You can test the service through the API Gateway, which will send messages to this microservice via Kafka.

Example order creation request:
```bash
curl -X POST http://localhost:3000/api/orders \
-H "Content-Type: application/json" \
-d '{
  "items": [
    {
      "categoryId": "123e4567-e89b-12d3-a456-426614174000",
      "subCategoryId": "123e4567-e89b-12d3-a456-426614174001",
      "title": "Test Product",
      "description": "Test Description",
      "location": "Test Location",
      "price": 100
    }
  ]
}'
```

## Project Structure

```
orders-ms/
├── src/
│   ├── orders/           # Orders module
│   ├── config/           # Configuration
│   ├── common/           # Shared code
│   └── transports/       # Kafka configuration
├── prisma/
│   └── schema.prisma     # Database schema
└── test/                 # Test files
```

## Available Scripts

- `npm run start:dev` - Start in development mode
- `npm run build` - Build the application
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run linting
- `npm run test` - Run tests

## Troubleshooting

1. If Kafka connection fails:
   - Verify Kafka is running: `nc -zv localhost:9092`
   - Check your `.env` configuration
   - Ensure no firewall is blocking port 9092


## Additional Notes

- The service uses NestJS's microservice architecture
- Kafka is used for message queuing
- PostgreSQL (Neon) is used as the database

## Support

For issues and questions, please contact the development team.