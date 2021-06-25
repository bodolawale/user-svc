import {
  CreateUserResponse,
  CreateUserPayload,
} from './../../generated_proto/user/user_pb';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from 'grpc';

@Controller('user')
export class UserController {
  @GrpcMethod('UserService')
  createUser(
    body: CreateUserPayload.AsObject,
    metadata: Metadata,
  ): Promise<CreateUserResponse.AsObject> {
    const a: any = 1;
    return a;
  }
}
