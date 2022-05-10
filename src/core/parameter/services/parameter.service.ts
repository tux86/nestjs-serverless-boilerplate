import { Injectable, Logger } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterDto } from '../dtos/create-parameter.dto';
import {
  ResourceAlreadyExistsException,
  ResourceNotExistsException,
} from '../../../shared/exceptions';
import { UpdateParameterDto } from '../dtos/update-parameter.dto';

@Injectable()
export class ParameterService {
  private logger = new Logger(ParameterService.name);

  constructor(
    @InjectRepository(Parameter)
    private repository: Repository<Parameter>,
  ) {}

  public async find(): Promise<Parameter[] | never> {
    return await this.repository.find();
  }

  public async findById(
    parameterId: string,
  ): Promise<Parameter | undefined | never> {
    const parameter = await this.repository.findOne({
      where: {
        parameterId,
      },
    });
    if (!parameter) {
      throw new ResourceNotExistsException(Parameter, parameterId);
    }
    return parameter;
  }

  public async findByName(
    name: string,
  ): Promise<Parameter | undefined | never> {
    return await this.repository.findOne({
      name,
    });
  }

  public async create(input: CreateParameterDto): Promise<Parameter | never> {
    const { name } = input;
    const existingParameter = await this.findByName(name);
    if (existingParameter) {
      throw new ResourceAlreadyExistsException(
        Parameter,
        existingParameter.parameterId,
      );
    }
    const parameter = this.repository.create(input);
    return await this.repository.save(parameter);
  }

  public async update(input: UpdateParameterDto): Promise<Parameter | never> {
    const parameter = await this.repository.preload(input);
    if (!parameter) {
      throw new ResourceNotExistsException(Parameter, parameter.parameterId);
    }
    return await this.repository.save(parameter);
  }
  public async remove(parameterId: string): Promise<boolean | never> {
    const parameter = await this.findById(parameterId);
    await this.repository.softRemove(parameter);
    return true;
  }
}
