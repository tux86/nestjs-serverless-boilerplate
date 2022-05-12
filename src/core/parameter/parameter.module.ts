import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterService } from './services/parameter.service';
import { Parameter } from './entities/parameter.entity';
import { ParameterValueService } from './services/parameter-value.service';
import { ParameterValue } from './entities/parameter-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter, ParameterValue])],
  providers: [ParameterService, ParameterValueService],
  exports: [ParameterService, ParameterValueService],
})
export class ParameterModule {}
