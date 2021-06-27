import { FactoryProvider } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import { Connection, createConnection, EntityManager } from 'typeorm';

function onModuleDestroy<T extends Record<string, any>>(
  thing: T,
  callback: (thing: T) => Promise<void>,
): T {
  return new Proxy<T>(thing, {
    get(target: T, property: PropertyKey) {
      if (property === 'onModuleDestroy') {
        return () => callback(thing);
      }
      return target[property as keyof T];
    },
  });
}

export const databaseProviders: Provider[] = [
  {
    provide: Connection,
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
        cli: {
          migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
        },
      }),
  },
];

export const entityManagerProvider: FactoryProvider = {
  provide: EntityManager,
  useFactory: async (cxn: Connection) => {
    if (!cxn.isConnected) {
      await cxn.connect();
    }
    const manager = cxn.createEntityManager();
    return onModuleDestroy(manager, (m) => m.release());
  },
  inject: [Connection],
};
