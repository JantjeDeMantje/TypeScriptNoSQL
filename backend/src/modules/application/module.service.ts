import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ModuleRepository, ModuleFilter } from '../domain/module.repository';
import { Module, ModuleProps } from '../domain/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @Inject('ModuleRepository')
    private readonly repo: ModuleRepository
  ) {}

  list(filter: ModuleFilter) {
    return this.repo.findAll(filter);
  }

  get(code: string) {
    return this.repo.findByCode(code);
  }

  create(dto: ModuleProps) {
    return this.repo.create(Module.create(dto));
  }

  update(code: string, patch: Partial<ModuleProps>) {
    return this.repo.update(code, patch);
  }

  async ensure(code: string) {
    const m = await this.get(code);
    if (!m) throw new NotFoundException('Module not found');
    return m;
  }
}