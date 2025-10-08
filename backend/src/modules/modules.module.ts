import { Module } from '@nestjs/common';
import { ModuleService } from './application/module.service';
import { ModuleController } from './interface/module.controller';
import { ModuleMongoRepository } from './infrastructure/module.mongo.repository';

@Module({
  providers: [
    ModuleService,
    ModuleMongoRepository,
    { provide: 'ModuleRepository', useExisting: ModuleMongoRepository },
  ],
  controllers: [ModuleController],
  exports: [ModuleService],
})
export class ModulesModule {}