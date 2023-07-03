import { INestApplication } from '@nestjs/common';
import CategorySwagger from '@modules/category/swagger/category.swagger';

export function MainSwagger(app: INestApplication) {
	CategorySwagger(app);
}
