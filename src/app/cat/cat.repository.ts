import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Cat } from './cat.entity';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  private logger = new Logger(CatRepository.name, {
    timestamp: true,
  });

  public async findById(catId: string): Promise<Cat | undefined> {
    try {
      const query = this.createQueryBuilder('u');
      query.where('u.catId = :catId', { catId });
      return await query.getOne();
    } catch (error) {
      this.logger.error(`${error} - ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }

  public async findByEmail(email: string): Promise<Cat> {
    return await this.createQueryBuilder()
      .select()
      .where('email = :email', { email })
      .getOne();
  }
  //
  // gql-public async create(cat: Partial<Cat>): Promise<Cat | undefined> {
  //   try {
  //     await this.createQueryBuilder().insert().into(Cat).values();
  //     return await query.getOne();
  //   } catch (error) {
  //     this.logger.error(`${error} - ${error.stack}`);
  //     throw new InternalServerErrorException();
  //   }
  // }
  //
  // gql-public async removeById(catId: number) {
  //   await this.remove();
  // }
}
