import { Injectable, Logger } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParameterValue } from '../entities/parameter-value.entity';

@Injectable()
export class ParameterValueService {
  private logger = new Logger(ParameterValueService.name);

  constructor(
    @InjectRepository(Parameter)
    private repository: Repository<ParameterValue>,
  ) {}

  // public find() {}
  // public findById() {}
  // public findByName() {}
  // public create() {}
  // public update() {}
  // public remove() {}
}
