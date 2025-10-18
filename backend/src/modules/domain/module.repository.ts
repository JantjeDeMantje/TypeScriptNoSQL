import { Module } from './module.entity';

export interface ModuleFilter {
  ec?: number;
  level?: string;
  theme?: string;
  q?: string;
}

export interface ModuleRepository {
  findAll(filter?: ModuleFilter): Promise<Module[]>;
  findByCode(code: string): Promise<Module | null>;
  create(module: Module): Promise<Module>;
  update(code: string, patch: Partial<ReturnType<Module['toJSON']>>): Promise<Module | null>;
  delete(code: string): Promise<boolean>;
}