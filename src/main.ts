// import { NestFactory, Reflector } from '@nestjs/core';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import helmet from 'helmet';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';

// import { AppModule } from './app.module';
// import { setupSwagger } from './config/swagger.config';
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

// async function bootstrap() {
//   const logger = new Logger('Bootstrap');
//   const app = await NestFactory.create(AppModule, {
//     logger: ['log', 'error', 'warn', 'debug', 'verbose'],
//     cors: true,
//   });

//   const configService = app.get(ConfigService);
//   const reflector = app.get(Reflector);

//   // Security Middleware
//   app.use(helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   }));
//   app.use(compression());

//   // Rate Limiting
//   app.use(
//     rateLimit({
//       windowMs: 15 * 60 * 1000, // 15 minutes
//       max: 1000, // limit each IP to 1000 requests per windowMs
//       message: {
//         statusCode: 429,
//         message: 'Too many requests from this IP, please try again later.',
//         error: 'Too Many Requests',
//       },
//     }),
//   );

//   // Global Validation
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//       validationError: {
//         target: false,
//         value: false,
//       },
//     }),
//   );

//   // Global Guards
//   app.useGlobalGuards(new JwtAuthGuard(reflector));

//   // CORS Configuration
//   const frontendUrl = configService.get('frontend.url');
//   app.enableCors({
//     origin: [
//       frontendUrl,
//       'http://localhost:3000',
//       'http://localhost:3001',
//       'https://your-frontend.onrender.com',
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'X-Requested-With',
//       'Accept',
//       'Origin',
//       'Access-Control-Allow-Headers',
//       'Access-Control-Request-Method',
//       'Access-Control-Request-Headers',
//     ],
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   });

//   // Global Prefix
//   const globalPrefix = configService.get('apiPrefix') || '/api/v1';
//   app.setGlobalPrefix(globalPrefix);

//   // Swagger Documentation
//   if (configService.get('environment') !== 'production') {
//     setupSwagger(app);
//   }

//   // Server Configuration
//   const port = configService.get('port') || 5000;
//   await app.listen(port);

//   // Startup Logging
//   logger.log(`🚀 Application is running on: http://localhost:${port}`);
//   logger.log(`🌐 Environment: ${configService.get('environment')}`);
//   logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
//   logger.log(`🔐 API Base URL: http://localhost:${port}${globalPrefix}`);
//   logger.log(`📊 Database: ${configService.get('database.url') ? 'Connected' : 'Disconnected'}`);

//   // Graceful shutdown
//   process.on('SIGINT', async () => {
//     logger.log('🛑 Received SIGINT, shutting down gracefully...');
//     await app.close();
//     process.exit(0);
//   });

//   process.on('SIGTERM', async () => {
//     logger.log('🛑 Received SIGTERM, shutting down gracefully...');
//     await app.close();
//     process.exit(0);
//   });
// }

// bootstrap().catch(error => {
//   Logger.error('❌ Failed to start application', error);
//   process.exit(1);
// });

import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import 'reflect-metadata';

import * as compression from 'compression';
import { rateLimit } from 'express-rate-limit';  // ← Fixed: named import

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    cors: true,
  });

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Security Middleware
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }));
  app.use(compression());

  // Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: {
        statusCode: 429,
        message: 'Too many requests from this IP, please try again later.',
        error: 'Too Many Requests',
      },
    }),
  );

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  // Global Guards
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // CORS Configuration
  const frontendUrl = configService.get('frontend.url');
  app.enableCors({
    origin: [
      frontendUrl,
      'http://localhost:3000',
      'http://localhost:3001',
      'https://your-frontend.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Global Prefix
  const globalPrefix = configService.get('apiPrefix') || '/api/v1';
  app.setGlobalPrefix(globalPrefix);

  // Swagger Documentation
  if (configService.get('environment') !== 'production') {
    setupSwagger(app);
  }

  // Server Configuration
  const port = configService.get('port') || 5000;
  await app.listen(port);

  // Startup Logging
  logger.log(` Application is running on: http://localhost:${port}`);
  logger.log(` Environment: ${configService.get('environment')}`);
  logger.log(` API Documentation: http://localhost:${port}/api/docs`);
  logger.log(` API Base URL: http://localhost:${port}${globalPrefix}`);
  logger.log(` Database: ${configService.get('database.url') ? 'Connected' : 'Disconnected'}`);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    logger.log(' Received SIGINT, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.log(' Received SIGTERM, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(error => {
  Logger.error(' Failed to start application', error);
  process.exit(1);
});