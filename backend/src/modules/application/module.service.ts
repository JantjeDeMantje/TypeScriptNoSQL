import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ModuleRepository, ModuleFilter } from '../domain/module.repository';
import { Module, ModuleProps } from '../domain/module.entity';
import { MODULE_REPO } from '../tokens';

@Injectable()
export class ModuleService {
  constructor(
    @Inject(MODULE_REPO)
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

  async delete(code: string) {
    const deleted = await this.repo.delete(code);
    if (!deleted) throw new NotFoundException('Module not found');
    return deleted;
  }
}