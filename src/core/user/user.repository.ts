import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger(UserRepository.name, {
    timestamp: true,
  });

  public async findById(userId: string): Promise<User | undefined> {
    try {
      const query = this.createQueryBuilder('u');
      query.where('u.userId = :userId', { userId });
      return await query.getOne();
    } catch (error) {
      this.logger.error(`${error} - ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder()
      .select()
      .where('email = :email', { email })
      .getOne();
  }

  //
  // gql-public async create(user: Partial<User>): Promise<User | undefined> {
  //   try {
  //     await this.createQueryBuilder().insert().into(User).values();
  //     return await query.getOne();
  //   } catch (error) {
  //     this.logger.error(`${error} - ${error.stack}`);
  //     throw new InternalServerErrorException();
  //   }
  // }
  //
  // gql-public async removeById(userId: number) {
  //   await this.remove();
  // }
}
