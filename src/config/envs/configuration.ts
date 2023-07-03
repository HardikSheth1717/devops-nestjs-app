export default () => ({
	environment: process.env.NODE_ENV,
	applicationPort: process.env.PORT,
	database: {
		mysql: {
			type: process.env.MYSQL_CONNECTION,
			host: process.env.MYSQL_HOST,
			port: process.env.MYSQL_PORT,
			database: process.env.MYSQL_NAME,
			username: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			synchronize: process.env.MYSQL_SYNCHRONIZE === 'Yes',
			dropSchema: process.env.MYSQL_DROP_SCHEMA === 'Yes',
			migrationsRun: process.env.MYSQL_MIGRATIONS_RUN === 'Yes',
			logging: process.env.MYSQL_LOGGING === 'Yes',
			autoLoadEntities: true,
			entities: ['dist/**/entity/*.entity{.ts,.js}'],
			migrationsTableName: process.env.MYSQL_MIGRATIONS_TABLE_NAME,
			migrations: ['dist/database/migrations/*{.ts,.js}'],
			cli: {
				migrationsDir: 'src/database/migrations'
			}
		},
		redis: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			password: process.env.REDIS_PASSWORD
		}
	},
	jwt: {
		accessToken: {
			secret: process.env.ACCESS_SECTRET_KEY,
			expiry: process.env.ACCESS_EXPIRY_TIME
		},
		refreshToken: {
			secret: process.env.REFRESH_SECTRET_KEY,
			expiry: process.env.REFRESH_EXPIRY_TIME
		}
	},
	crypto: {
		algorithm: process.env.ENCRYPTION_ALGORITHM
	}
});
