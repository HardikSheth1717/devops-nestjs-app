import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

const env = !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`;
const dotEnvPath = path.resolve(process.cwd(), env);
const result = dotenv.config({ path: dotEnvPath });
if (result.error) {
	/* Do nothing */
}

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: result.parsed.MYSQL_HOST,
	port: parseInt(result.parsed.MYSQL_PORT),
	database: result.parsed.MYSQL_NAME,
	username: result.parsed.MYSQL_USERNAME,
	password: result.parsed.MYSQL_PASSWORD,
	synchronize: result.parsed.MYSQL_SYNCHRONIZE === 'Yes',
	dropSchema: result.parsed.MYSQL_DROP_SCHEMA === 'Yes',
	migrationsRun: result.parsed.MYSQL_MIGRATIONS_RUN === 'Yes',
	logging: result.parsed.MYSQL_LOGGING === 'Yes',
	entities: [
		// 'dist/**/entities/*.entity{.ts,.js}',
		//'src/**/entities/*.entity{.ts,.js}'
		join(__dirname, '**', 'entities', '*.entity.{ts,js}')
	],
	migrationsTableName: result.parsed.MYSQL_MIGRATIONS_TABLE_NAME,
	migrations: [
		// 'dist/database/migrations/*{.ts,.js}',
		//'src/database/migrations/*.ts'
		join(__dirname, 'database', 'migrations', '*.entity.{ts,js`}')
	]
});
