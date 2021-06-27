module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number.parseInt(process.env.PG_PORT, 2),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
