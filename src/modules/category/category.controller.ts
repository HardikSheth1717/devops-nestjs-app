import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	Inject,
	Param,
	ParseIntPipe,
	Body
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { CategoryServiceInterface } from './interfaces/category.service.interface';

import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryEntity } from './entities/category.entity';
import { BaseController } from '@base/controller/base.controller';
import { Permissions } from '@core/decorators/permission.decorator';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { User } from '@core/decorators/user.decorator';

/**
 * An API for category master.
 */
@Controller('category')
export class CategoryController extends BaseController {
	constructor(
		@Inject(DIToken.CATEGORY_SERVICE_INTERFACE)
		private categoryService: CategoryServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of category.
	 */
	@Get()
	@Permissions(`ITMCAT:${PermissionEnum.VIEW}`)
	public async get(): Promise<CategoryEntity[]> {
		return await this.categoryService.getAll();
	}

	/**
	 * Returns a single record of category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Get(':id')
	@Permissions(`ITMCAT:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<CategoryEntity> {
		return await this.categoryService.getOneById(id);
	}

	/**
	 * Create new category.
	 * @param {CreateCategoryDto} data - Data which need to be stored in database table.
	 */
	@Post()
	@Permissions(`ITMCAT:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateCategoryDto,
	): Promise<number> {
		data.createdBy = 1;
		//Console.log(user);
		return (await this.categoryService.create(data)).categoryId;
	}

	/**
	 * Update an existing category.
	 * @param {UpdateCategoryDto} data - Data which need to be stored in database table.
	 */
	@Put()
	@Permissions(`ITMCAT:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateCategoryDto
	): Promise<boolean> {
		data.modifiedBy = 1;
		return (
			(await this.categoryService.update(data.categoryId, data))
				.categoryId > 0
		);
	}

	/**
	 * Delete category based on the given category id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	@Permissions(`ITMCAT:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.categoryService.delete(id)).affected > 0;
	}
}
