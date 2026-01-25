import { Module } from '@nestjs/common';
import { ModulesModule } from '../modules/modules.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ModulesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
