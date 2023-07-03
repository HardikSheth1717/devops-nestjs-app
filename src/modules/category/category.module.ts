import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { CategoryRepository } from './repositories/category.repository';

import { CategoryEntity } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
	providers: [
		{
			provide: DIToken.CATEGORY_REPOSITORY_INTERFACE,
			useClass: CategoryRepository
		},
		{
			provide: DIToken.CATEGORY_SERVICE_INTERFACE,
			useClass: CategoryService
		}
	],
	controllers: [CategoryController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.CATEGORY_REPOSITORY_INTERFACE,
			useClass: CategoryRepository
		},
		{
			provide: DIToken.CATEGORY_SERVICE_INTERFACE,
			useClass: CategoryService
		}
	]
})
export class CategoryModule {}
