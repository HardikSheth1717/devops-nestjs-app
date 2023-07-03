import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

/**
 * A base repository contract which must be implemented by all other repositories.
 */
export interface BaseRepositoryInterface<T> {
	/**
	 * Returns a list of all the records of type T.
	 */
	getAll(): Promise<T[]>;

	/**
	 * Returns a single record of type T based on the given unique id.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneById(condition: FindOneOptions): Promise<T>;

	/**
	 * Returns a single record of type T based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions): Promise<T>;

	/**
	 * Returns a list of records of type T based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions): Promise<T[]>;

	/**
	 * Create record(s).
	 * @param {T | any} data - Data which need to be inserted in database table.
	 */
	create(data: T | any): Promise<T>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {T | any} data - Data which need to be updated in database table.
	 */
	update(id: number, data: T | any): Promise<T>;

	/**
	 * Create / update record(s).
	 * @param {T | any} data - Data which need to be stored in database table.
	 */
	saveChanges(data: T | any): Promise<T>;

	/**
	 * Create / update record(s).
	 * @param {T | any} data - Data which need to be stored in database table.
	 */
	saveBulk(data: T[] | any): Promise<T[]>;

	/**
	 * Delete record(s) based on the given unique id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
