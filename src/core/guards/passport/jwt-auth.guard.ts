import {
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC } from '@core/constants/common.constant';

/**
 * A common authentication guard which will check if the requested user is authenticated or not using JWT access token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	/**
	 * Check if the controller or handler is decorated with [NoAuthRoute]{@link NoAuthRoute} decorator then it will skip authentication check otherwise only authenticated requests will be landed on the handler.
	 * @param context Execution context
	 */
	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			context.getHandler(),
			context.getClass()
		]);

		if (isPublic) {
			return true;
		}

		return super.canActivate(context);
	}

	handleRequest(error: any, user: any) {
		if (error || !user) {
			throw error || new UnauthorizedException();
		}

		return user;
	}
}
