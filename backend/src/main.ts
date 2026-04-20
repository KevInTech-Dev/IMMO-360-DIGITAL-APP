import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Demarrage');

  // Middleware de securite
  app.use(helmet.default());

  // Limitation du debit
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP a 100 requetes par windowMs
    message: 'Trop de requetes de cette IP, veuillez reessayer plus tard.',
  });

  // Appliquer la limitation du debit a tous les routes
  app.use(limiter);

  // Filtre global d'exceptions
  app.useGlobalFilters(new HttpExceptionFilter(app.get('HttpAdapterHost')));

  // Pipe de validation avec configuration amelioree
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false,
    }),
  );

  // Configuration CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API IMMO 360 Digital')
    .setDescription('Documentation de l\'API pour la plateforme immobiliere IMMO 360 Digital')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('Auth', 'Points d\'entree d\'authentification')
    .addTag('Users', 'Points d\'entree de gestion des utilisateurs')
    .addTag('Properties', 'Points d\'entree des proprietes immobilieres')
    .addTag('Reservations', 'Points d\'entree de gestion des reservations')
    .addTag('Payments', 'Points d\'entree de traitement des paiements')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`L'application est en cours d'execution sur: http://localhost:${port}`);
  logger.log(`Documentation Swagger: http://localhost:${port}/api/docs`);
  logger.log(`Fonctionnalites de securite activees: CORS, Limitation du debit, Helmet`);
}

bootstrap().catch((err) => {
  console.error('Erreur au demarrage de l\'application:', err);
  process.exit(1);
});
