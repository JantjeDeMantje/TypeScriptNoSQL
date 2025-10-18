import { Module } from '@nestjs/common';
import { ModuleService } from './application/module.service';
import { ModuleController } from './interface/module.controller';
import { ModuleMongoRepository } from './infrastructure/module.mongo.repository';
import { MODULE_REPO } from './tokens';

@Module({
  providers: [
    ModuleService,
    ModuleMongoRepository,
    { provide: MODULE_REPO, useExisting: ModuleMongoRepository },
  ],
  controllers: [ModuleController],
  exports: [ModuleService],
})
export class ModulesModule {}