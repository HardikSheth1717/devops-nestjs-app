import * as path from 'path';
import * as dotenv from 'dotenv';

const env = !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`;
const dotEnvPath = path.resolve(process.cwd(), env);
const result = dotenv.config({ path: dotEnvPath });
if (result.error) {
	/* Do nothing */
}

export const DatabaseConfig = {
	type: result.parsed.MYSQL_CONNECTION,
	host: result.parsed.MYSQL_HOST,
	port: result.parsed.MYSQL_PORT,
	database: result.parsed.MYSQL_NAME,
	username: result.parsed.MYSQL_USERNAME,
	password: result.parsed.MYSQL_PASSWORD,
	synchronize: result.parsed.MYSQL_SYNCHRONIZE === 'Yes',
	dropSchema: result.parsed.MYSQL_DROP_SCHEMA === 'Yes',
	migrationsRun: result.parsed.MYSQL_MIGRATIONS_RUN === 'Yes',
	logging: result.parsed.MYSQL_LOGGING === 'Yes',
	autoLoadEntities: true,
	entities: [
		'dist/**/entities/*.entity{.ts,.js}',
		'src/**/entities/*.entity{.ts,.js}'
	],
	migrationsTableName: result.parsed.MYSQL_MIGRATIONS_TABLE_NAME,
	migrations: [
		// 'dist/database/migrations/*{.ts,.js}',
		'src/database/migrations/*.ts'
	],
	cli: {
		migrationsDir: 'src/database/migrations'
	}
};

export default DatabaseConfig;
