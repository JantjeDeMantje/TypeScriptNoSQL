import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from '../modules/modules.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ModulesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
