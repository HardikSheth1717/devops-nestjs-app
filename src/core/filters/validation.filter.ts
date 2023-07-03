import {
	ExceptionFilter,
	HttpStatus,
	ArgumentsHost,
	Catch,
	HttpException
} from '@nestjs/common';

import { Response } from 'express';

import { ValidationException } from '@core/exceptions/validation.exception';
import GenericResponse from '@base/dto/genericresponse.dto';

/**
 * A validation exception filter to handle all the exceptions related to validations.
 */
@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost) {
		const httpContext = host.switchToHttp();

		const response = httpContext.getResponse<Response>();

		const requestHttpMethod = response.req.method;
		let errorData: unknown;

		switch (requestHttpMethod) {
			case 'POST':
				errorData = null;
				break;
			case 'PUT':
			case 'DELETE':
				errorData = true;
				break;
			default:
				errorData = [];
				break;
		}

		let statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.BAD_REQUEST;

		statusCode =
			exception.messages.length > 0 ? HttpStatus.BAD_REQUEST : statusCode;

		const propertyList = exception.messages.map(
			(x: { property: any }) => x.property
		);

		const messages = [];

		propertyList.forEach((property: string | number) => {
			const exceptionObj = exception.messages.find(
				(x: { property: string | number }) => x.property === property
			);

			if (exceptionObj) {
				messages.push({
					field: property,
					errors: Object.values(exceptionObj.constraints)
				});
			}
		});

		const customResponse = new GenericResponse<[] | unknown>(
			exception.messages.length > 0 ? HttpStatus.BAD_REQUEST : statusCode,
			errorData,
			messages
		);

		return response.status(statusCode).json(customResponse);
	}
}
