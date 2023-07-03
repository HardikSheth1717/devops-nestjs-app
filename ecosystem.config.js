module.exports = {
	apps: [
		{
			name: 'semaphore-api',
			script: './dist/main.js',
			watch: true,
			ignore_watch: ['node_modules'],
			env_production: {
				PORT: 4000,
				NODE_ENV: 'production'
			},
			env_development: {
				PORT: 4000,
				NODE_ENV: 'development'
			},
			env_staging: {
				PORT: 4000,
				NODE_ENV: 'staging'
			}
		}
	]
};
