import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from '@modules/category/category.module';

import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { JwtAuthGuard } from '@core/guards/passport/jwt-auth.guard';
import configuration from '@config/envs/configuration';
import { ValidationExceptionFilter } from '@core/filters/validation.filter';
import { GenericExceptionFilter } from '@core/filters/generic.filter';
import { PermissionGuard } from '@core/guards/auth/permission.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !process.env.NODE_ENV
				? '.env'
				: `.env.${process.env.NODE_ENV}`,
			load: [configuration]
		}),
		TypeOrmModule.forRootAsync({
			name: 'default',
			useFactory: (configService: ConfigService) => ({
				...configService.get('database.mysql')
			}),
			inject: [ConfigService]
		}),
		RedisModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				closeClient: true,
				config: {
					...configService.get('database.redis')
				}
			}),
			inject: [ConfigService]
		}),
		CategoryModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GenericExceptionFilter
		},
		{
			provide: APP_FILTER,
			useClass: ValidationExceptionFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		},
		// {
		// 	provide: APP_GUARD,
		// 	useClass: JwtAuthGuard
		// },
		// {
		// 	provide: APP_GUARD,
		// 	useClass: PermissionGuard
		// },
		AppService,
		AppController
	]
})
export class AppModule {}
