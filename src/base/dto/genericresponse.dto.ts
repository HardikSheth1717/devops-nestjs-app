import { HttpStatus } from '@nestjs/common';

/**
 * A generic DTO for common response format.
 */
export default class GenericResponse<T> {
	/**
	 * Constructor.
	 * @param statusCode HttpStatus code.
	 * @param data Response data.
	 * @param messages Validation / error messages.
	 */
	constructor(
		public statusCode: HttpStatus,
		public data: T,
		public messages: T
	) {
		this.statusCode = statusCode;
		this.data = data;
		this.messages = messages;
	}
}
