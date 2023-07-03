import { NestFactory } from '@nestjs/core';
import {
	ValidationPipe,
	ValidationError,
	VersioningType
} from '@nestjs/common';

import 'reflect-metadata';

import helmet from 'helmet';

import compression from 'compression';

import { AppModule } from './app.module';

import { ValidationException } from '@core/exceptions/validation.exception';
import { API_PREFIX } from '@core/constants/common.constant';

import { MainSwagger } from '@config/swagger/main.swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// API versioning
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});

	app.enableCors();

	if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === "") {
		app.use(helmet());
	}
	
	app.use(compression());

	app.setGlobalPrefix(`${API_PREFIX}`);

	// App.useGlobalFilters(
	//   New GenericExceptionFilter(),
	//   // new ValidationExceptionFilter(),
	// );

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors: ValidationError[]) =>
				new ValidationException(errors)
		})
	);

	// Initialize SwaggerModule
	MainSwagger(app);

	await app.listen(process.env.SERVER_PORT);
}

bootstrap();
