import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from './cat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CatRepository])],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
