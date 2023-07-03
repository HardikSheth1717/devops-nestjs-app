import { HttpException, ValidationError, HttpStatus } from '@nestjs/common';

/**
 * A class for custom HttpException to handle all the validation specific exception.
 */
export class ValidationException extends HttpException {
	/**
	 * Constructor.
	 * @param messages Validation error messages.
	 */
	constructor(public messages: ValidationError[]) {
		super(messages, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
