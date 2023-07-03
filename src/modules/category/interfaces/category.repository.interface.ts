import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CategoryEntity } from '../entities/category.entity';

/**
 * A contract for [CategoryRepository]{@link CategoryRepository} class.
 */
export type CategoryRepositoryInterface =
	BaseRepositoryInterface<CategoryEntity>;
