import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { CategoryRepositoryInterface } from './interfaces/category.repository.interface';
import { CategoryServiceInterface } from './interfaces/category.service.interface';

import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryEntity } from './entities/category.entity';

/**
 * A service / provider for category master.
 */
@Injectable()
export class CategoryService implements CategoryServiceInterface {
	constructor(
		@Inject(DIToken.CATEGORY_REPOSITORY_INTERFACE)
		private readonly categoryRepository: CategoryRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of category.
	 */
	getAll(): Promise<CategoryEntity[]> {
		try {
			return this.categoryRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CategoryEntity> {
		try {
			return this.categoryRepository.getOneById({
				where: {
					categoryId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of category based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CategoryEntity> {
		try {
			return this.categoryRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of category based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CategoryEntity[]> {
		try {
			return this.categoryRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {CreateCategoryDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCategoryDto): Promise<CategoryEntity> {
		try {
			return this.categoryRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCategoryDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity> {
		try {
			return this.categoryRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update category.
	 * @param {CreateCategoryDto | UpdateCategoryDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCategoryDto | UpdateCategoryDto
	): Promise<CategoryEntity> {
		try {
			return this.categoryRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.categoryRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
