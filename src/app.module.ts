import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
