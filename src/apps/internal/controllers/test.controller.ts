import { Controller, Get } from '@nestjs/common';
import { ParameterValueService } from '@/core/parameter/services/parameter-value.service';

@Controller('test')
export class TestController {
  constructor(private parameterValueService: ParameterValueService) {}

  @Get('filters')
  async sendEmailSuccessTest(): Promise<any> {
    return await this.parameterValueService.findAll({});
  }
}
