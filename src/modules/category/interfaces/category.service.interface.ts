import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateCategoryDto } from '../dto/createCategory.dto';
import { UpdateCategoryDto } from '../dto/updateCategory.dto';
import { CategoryEntity } from '../entities/category.entity';

/**
 * A service contract which must be implemented by [CategoryService]{@link CategoryService}.
 */
export interface CategoryServiceInterface {
	/**
	 * Returns a list of all the records of category.
	 */
	getAll(): Promise<CategoryEntity[]>;

	/**
	 * Returns a single record of category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CategoryEntity>;

	/**
	 * Returns a single record of category based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CategoryEntity>;

	/**
	 * Returns a list of records of category based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CategoryEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateCategoryDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCategoryDto): Promise<CategoryEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCategoryDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity>;

	/**
	 * Create / update category.
	 * @param {CreateCategoryDto | UpdateCategoryDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCategoryDto | UpdateCategoryDto
	): Promise<CategoryEntity>;

	/**
	 * Delete category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
