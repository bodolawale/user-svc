import { UserService } from './user.service';
import {
  CreateUserResponse,
  CreateUserPayload,
} from './../../generated_proto/user/user_pb';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from 'grpc';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @GrpcMethod('UserService')
  createUser(
    body: CreateUserPayload.AsObject,
    metadata: Metadata,
  ): Promise<CreateUserResponse.AsObject> {
    return this.userService.createUser(body, metadata);
  }
}
