import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterService } from './services/parameter.service';
import { Parameter } from './entities/parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParameterService],
  exports: [ParameterService],
})
export class ParameterModule {}
