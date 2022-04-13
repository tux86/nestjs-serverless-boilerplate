import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
