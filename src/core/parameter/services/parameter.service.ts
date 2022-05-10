import { Injectable, Logger } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterInput } from '../dtos/create-parameter.input';
import { UpdateParameterInput } from '../dtos/update-parameter.input';

@Injectable()
export class ParameterService {
  private logger = new Logger(ParameterService.name);

  constructor(
    @InjectRepository(Parameter)
    private repository: Repository<Parameter>,
  ) {}

  // public find() {}
  // public findById() {}
  public async create(input: CreateParameterInput): Promise<Parameter | never> {
    const parameter = this.repository.create(input);
    return await this.repository.save(parameter);
  }
  // public update(input: UpdateParameterInput): Promise<Parameter | never> {
  //   const parameter = this.repository.create(input);
  //   return await this.repository.save(parameter);
  // }
  // public remove() {}
}
