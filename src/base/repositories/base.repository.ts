import {
	FindOneOptions,
	FindManyOptions,
	DeleteResult,
	Repository
} from 'typeorm';

import { BaseRepositoryInterface } from '../interfaces/base.repository.interface';

/**
 * A base abstract repository which will be extended by all other repositories.
 */
export abstract class BaseAbstractRepository<T>
	implements BaseRepositoryInterface<T>
{
	/**
	 * A private class member to store repository instance.
	 */
	private repository: Repository<T>;

	/**
	 * A protected constructor.
	 * @param {Repository} repository - Repository instance.
	 */
	protected constructor(repository: Repository<T>) {
		this.repository = repository;
	}

	/**
	 * Returns a list of all the records of type T.
	 */
	getAll(): Promise<T[]> {
		try {
			return this.repository.find();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	/**
	 * Returns a single record of type T based on the given unique id.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneById(condition: FindOneOptions<any>): Promise<T> {
		try {
			return this.repository.findOne(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of type T based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<T> {
		try {
			return this.repository.findOne(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of type T based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<T[]> {
		try {
			return this.repository.find(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {T | any} data - Data which need to be inserted in database table.
	 */
	create(data: T | any): Promise<T> {
		try {
			return this.repository.save(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {T | any} data - Data which need to be updated in database table.
	 */
	update(id: number, data: T | any): Promise<T> {
		try {
			return this.repository.save(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update record(s).
	 * @param {T | any} data - Data which need to be stored in database table.
	 */
	saveChanges(data: T | any): Promise<T> {
		try {
			return this.repository.save(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update record(s).
	 * @param {T[] | any} data - Data which need to be stored in database table.
	 */
	saveBulk(data: T[] | any): Promise<T[]> {
		try {
			return this.repository.save(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete record(s) based on the given unique id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.repository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
