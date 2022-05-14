import { Controller, Get } from '@nestjs/common';
import { ParameterValueService } from '@/core/parameter/services/parameter-value.service';
import { QueryListArgs } from '@/shared/dtos/query-list.args';
import { Args } from '@nestjs/graphql';

@Controller('test')
export class TestController {
  constructor(private parameterValueService: ParameterValueService) {}

  @Get('filters')
  async sendEmailSuccessTest(@Args() args: QueryListArgs): Promise<any> {
    return await this.parameterValueService.findAll(args);
  }
}
