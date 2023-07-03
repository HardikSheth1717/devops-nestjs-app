import { DIToken } from '@core/constants/enums/ditoken.enum';
import { PERMISSION_KEYS } from '@core/decorators/permission.decorator';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride(
			PERMISSION_KEYS,
			[context.getHandler(), context.getClass()]
		);

		if (!requiredPermissions) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();

		const permissions = [];

		user.permissions = permissions;

		if (!user || !user.permissions) {
			return true;
		}

		const featureCode: string = requiredPermissions.split(':')[0];
		const permission: string = requiredPermissions.split(':')[1];
		// Const permissions = user.permissions as PermissionDto[];

		if (
			permissions.findIndex(
				x => x.code === featureCode && x[permission]
			) >= 0
		) {
			return true;
		} else {
			throw new ForbiddenException('Access denied.');
		}
	}
}
