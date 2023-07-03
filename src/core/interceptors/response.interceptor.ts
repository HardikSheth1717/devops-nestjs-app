import GenericResponse from '@base/dto/genericresponse.dto';
import {
	CallHandler,
	ExecutionContext,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common';

import { Response } from 'express';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * An interface to define common response format.
 */
export interface CustomResponse<T> {
	statusCode: HttpStatus;
	data: T;
}

/**
 * An interceptor which will manipulate the response and convert it in to common response format through out the application.
 */
@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T, GenericResponse<[] | unknown>>
{
	/**
	 * A method to be implemented as per NestInterceptor contract.
	 * @param context Execution context.
	 * @param next Call handler.
	 * @returns Observable of CustomerResponse interface.
	 */
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<GenericResponse<[] | unknown>> {
		const response = context.switchToHttp().getResponse<Response>();
		const requestUrl = context.switchToHttp().getRequest<Request>().url;

		if (requestUrl.indexOf('webhook') > -1) {
			return next.handle().pipe(map(data => data));
		}

		return next
			.handle()
			.pipe(map(data => this.manipulateResponse(data, response)));
	}

	/**
	 * Converts the response data into common response format and attach appropriate http status code.
	 * @param value Actual response data returned from the API.
	 * @param response Response object from the Execution context.
	 * @returns A response object in the form of CustomerResponse interface.
	 */
	manipulateResponse(
		value: T,
		response: Response
	): GenericResponse<[] | unknown> {
		let statusCode: HttpStatus = response.statusCode;

		if (Array.isArray(value)) {
			if (value.length === 0) {
				statusCode = HttpStatus.NO_CONTENT;
			}
		} else if (
			!value ||
			value === null ||
			(typeof value !== 'object' &&
				typeof value !== 'boolean' &&
				typeof value !== 'number')
		) {
			statusCode = HttpStatus.NO_CONTENT;
		}

		response.statusCode = statusCode;

		return {
			statusCode: statusCode,
			data: value,
			messages: []
		};
	}
}
