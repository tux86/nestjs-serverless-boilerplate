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
}
