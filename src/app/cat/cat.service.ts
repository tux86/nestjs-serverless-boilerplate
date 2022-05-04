import { Injectable } from '@nestjs/common';
import { CatRepository } from './cat.repository';
import { Cat } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatRepository) private repository: CatRepository,
  ) {}

  public async findById(catId: string): Promise<Cat | undefined> {
    return await this.repository.findById(catId);
  }
}
