import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { CategoryRepositoryInterface } from '../interfaces/category.repository.interface';
import { CategoryEntity } from '../entities/category.entity';

/**
 * A repository for item_category table.
 */
@Injectable()
export class CategoryRepository
	extends BaseAbstractRepository<CategoryEntity>
	implements CategoryRepositoryInterface
{
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>
	) {
		super(categoryRepository);
	}
}
