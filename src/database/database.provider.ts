import { Provider } from '@nestjs/common';
import { createConnection } from 'typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: 'POSTGRES_DB',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT, 10),
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
  },
];
