import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const grcpOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, 'proto/user/user.service.proto'),
      url: `localhost:${process.env.GRPC_PORT}`,
    },
  };

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grcpOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
