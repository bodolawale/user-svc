import { Global, Module } from '@nestjs/common';
import { databaseProviders, entityManagerProvider } from './database.provider';

@Global()
@Module({
  providers: [...databaseProviders, entityManagerProvider],
  exports: [...databaseProviders, entityManagerProvider],
})
export class DatabaseModule {}
