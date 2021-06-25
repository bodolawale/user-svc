import { Metadata } from 'grpc';
import {
  CreateUserPayload,
  CreateUserResponse,
} from './../../generated_proto/user/user_pb.d';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // constructor() {}

  async createUser(
    data: CreateUserPayload.AsObject,
    metadata: Metadata,
  ): Promise<CreateUserResponse.AsObject> {
    return {
      id: 1,
      email: data.email,
      password: data.password,
    };
  }
}
