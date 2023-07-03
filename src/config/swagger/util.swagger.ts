import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { API_VERSION } from '@core/constants/common.constant';

export function createDocumentBuilder(
	moduleName: string
): Omit<OpenAPIObject, 'paths'> {
	const documentBuilder = new DocumentBuilder()
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			},
			'access-token'
		)
		.setTitle(
			moduleName
				? `Semaphore API Documentation (${moduleName})`
				: 'Semaphore API Documentation'
		)
		.setDescription(
			moduleName
				? `This is a complete API guide for ${moduleName} module.<br /><br /><br /><a href="${process.env.BASE_URL}:${process.env.SERVER_PORT}">Home</a>`
				: `This is a complete API guide for Semaphore.<br /><br /><br /><a href="${process.env.BASE_URL}:${process.env.SERVER_PORT}">Home</a>`
		)
		.setVersion(API_VERSION)
		.addTag(
			moduleName
				? `semaphore, api, nestjs, ${moduleName.toLowerCase()}`
				: 'semaphore, api, nestjs'
		)
		.build();

	return documentBuilder;
}
