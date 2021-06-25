import { Metadata } from 'grpc';
import {
  CreateUserPayload,
  CreateUserResponse,
} from './../../generated_proto/user/user_pb.d';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    this.userRepository = entityManager.getRepository(User);
  }

  async createUser(
    data: CreateUserPayload.AsObject,
    metadata: Metadata,
  ): Promise<CreateUserResponse.AsObject> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async getAllUsers(): Promise<any> {
    return this.userRepository.find();
  }
}
