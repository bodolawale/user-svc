import {
  User,
  CreateUserPayload,
  GetOneUserPayload,
} from './../../generated_proto/user/user.service_pb';
import { UserService } from './user.service';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @GrpcMethod('UserService')
  createUser(body: CreateUserPayload.AsObject): Promise<User.AsObject> {
    return this.userService.createUser(body);
  }

  @GrpcMethod('UserService')
  getOneUser(data: GetOneUserPayload.AsObject): Promise<User.AsObject> {
    return this.userService.fetchUser(data);
  }

  @GrpcMethod('UserService')
  getAllUsers(data: GetOneUserPayload.AsObject): Promise<User.AsObject[]> {
    return this.userService.getAllUsers();
  }
}
