import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  public async findById(userId: string): Promise<User | undefined> {
    return await this.repository.findById(userId);
  }
}
