import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SecretsManagerService } from '../aws/secrets-manager/secrets-manager.service';
import { DatabaseCredentialsDto } from './dtos/database-credentials.dto';
//TODO: should upgrade to class-transformer 5.x think to create wrapper
import { deserialize } from 'class-transformer';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly secretsManagerService: SecretsManagerService,
  ) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const environment: string = this.config.get<'string'>('environment');

    // retrieve database username and password from aws secrets manager service
    const dbCredentials = await this.getDatabaseCredentials();

    const defaultConfiguration: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.config.get<string>('database.host'),
      port: Number(this.config.get<number>('database.port')),
      username: dbCredentials.username,
      password: dbCredentials.password,
      database: this.config.get<string>('database.name'),
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      useUTC: this.config.get<boolean>('database.useUTC'),
    };

    return defaultConfiguration;

    //TODO: must be implemented
    // switch (environment) {
    //   case 'production':
    //     return {
    //       type: 'aurora-data-api-pg',
    //       database: this.config.get<string>('database.name'),
    //       secretArn: this.config.get<string>('database.secretArn'),
    //       resourceArn: this.config.get<string>('database.resourceArn'),
    //       region: this.config.get<string>('database.region'),
    //       entities: ['dist/**/*.entity{.ts,.js}'],
    //       synchronize: false,
    //     };
    //   case 'test':
    //     return {
    //       ...defaultConfiguration,
    //       keepConnectionAlive: true,
    //       entities: [__dirname, '**/*.entity{.ts,.js}'],
    //     };
    //   default:
    //     return defaultConfiguration;
    // }
  }

  private async getDatabaseCredentials(): Promise<DatabaseCredentialsDto> {
    const secretArn = this.config.get<string>('database.secretArn');
    const result = await this.secretsManagerService.getSecretValue(secretArn);

    return deserialize(DatabaseCredentialsDto, result as string);
  }
}
