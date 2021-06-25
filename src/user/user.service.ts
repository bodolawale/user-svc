import {
  GetOneUserPayload,
  CreateUserPayload,
  User,
} from './../../generated_proto/user/user.service_pb.d';
import { Metadata } from 'grpc';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    this.userRepository = entityManager.getRepository(UserEntity);
  }

  async createUser(data: CreateUserPayload.AsObject): Promise<User.AsObject> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async fetchUser(data: GetOneUserPayload.AsObject): Promise<User.AsObject> {
    return this.userRepository.findOne({ where: { id: data.id } });
  }

  async getAllUsers(): Promise<{ users: User.AsObject[] }> {
    const users = await this.userRepository.find({});
    return { users };
  }
}
