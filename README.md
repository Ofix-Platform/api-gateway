# API Gateway - Guía de Instalación

Este servicio actúa como punto de entrada para nuestra arquitectura de microservicios, gestionando las peticiones HTTP y comunicándose con otros servicios a través de Kafka.

## Prerrequisitos

- Node.js 16 o superior
- Docker y Docker Compose (para Kafka)
- npm o yarn

## Pasos para Instalar y Ejecutar

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd api-gateway
```

### 2. Configurar Variables de Entorno

1. Crear un archivo `.env` en el directorio raíz:

```bash
cp .env.template .env
```

2. El archivo `.env` debe contener:

```env
PORT=3000
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=orders-consumer-group
KAFKA_CLIENT_ID=api-gateway
```

### 3. Configurar Kafka

1. Iniciar Kafka con Docker Compose:

```bash
docker-compose up -d
```

2. Verificar que Kafka esté funcionando:

```bash
nc -zv localhost:9092
```

### 4. Instalar Dependencias e Iniciar la Aplicación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Alternativamente, construir y ejecutar en modo producción
npm run build
npm run start:prod
```

### 5. Verificar que la Aplicación Está Funcionando

```bash
curl http://localhost:3000
```

Deberías recibir: `{ "status": "Client Gateway is up and running!" }`

## Probar el API

### Crear una Orden

```bash
curl -X POST http://localhost:3000/api/orders \
-H "Content-Type: application/json" \
-d '{
  "items": [
    {
      "categoryId": "123e4567-e89b-12d3-a456-426614174000",
      "subCategoryId": "123e4567-e89b-12d3-a456-426614174001",
      "title": "Producto de Prueba",
      "description": "Descripción de Prueba",
      "location": "Lima, Perú",
      "price": 100
    }
  ]
}'
```

## Estructura del Proyecto

```
api-gateway/
├── src/
│   ├── main.ts              # Punto de entrada
│   ├── app.module.ts        # Módulo principal
│   ├── orders/              # Módulo de órdenes
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── dto/             # Objetos de Transferencia de Datos
│   │   └── services/        # Servicios
│   ├── common/              # Código compartido
│   │   ├── dto/             # DTOs comunes
│   │   └── exceptions/      # Filtros de excepción
│   ├── config/              # Configuraciones
│   └── transports/          # Configuración de transporte (Kafka)
└── docker-compose.yml       # Configuración de Docker
```

## Módulos Principales

- **health-check**: Verifica el estado del servicio
- **orders**: Gestiona las órdenes de usuarios
- **transports**: Configura la comunicación con Kafka

## Solución de Problemas

### Kafka no se conecta
- Verifica que Kafka esté ejecutándose: `nc -zv localhost:9092`
- Revisa los logs de Docker: `docker-compose logs -f kafka`
- Asegúrate que las variables en `.env` sean correctas

### El Servicio no Inicia
- Verifica que el puerto no esté ocupado: `lsof -i :3000`
- Asegúrate de que todas las dependencias estén instaladas correctamente
- Revisa los logs del servicio para identificar errores específicos

### Errores en las Peticiones
- Verifica que el formato JSON sea correcto
- Revisa que el payload cumpla con las validaciones del DTO
- Asegúrate de que el microservicio de órdenes esté ejecutándose

## Comandos Útiles

```bash
# Ejecutar tests
npm run test

# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

## Nota Importante

Para que el API Gateway funcione correctamente, asegúrate de que el microservicio de órdenes (orders-ms) también esté configurado y ejecutándose.