import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { ModuleService } from '../application/module.service';
import { CreateModuleDto, UpdateModuleDto } from './module.dto';
import { ModuleFilter } from '../domain/module.repository';

@Controller('modules')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  // Helper normalization (legacy string description -> object)
  private normalizeOut(m: any): any {
    const out = { ...m };
    if (typeof out.description === 'string') {
      out.description = { en: out.description, nl: out.description };
    }
    return out;
  }

  @Get()
  async list(@Query() q: ModuleFilter) {
    const filters: ModuleFilter = {
      ...q,
      ec: (q as any)?.ec !== undefined && (q as any).ec !== '' ? Number((q as any).ec) : undefined,
    };
    const modules = await this.service.list(filters);
    return modules.map((m) => this.normalizeOut(m.toJSON()));
  }

  @Get(':code')
  async get(@Param('code') code: string) {
    const m = await this.service.get(code);
    return m ? this.normalizeOut(m.toJSON()) : null;
  }

  @Post()
  async create(@Body() dto: CreateModuleDto) {
    return this.normalizeOut((await this.service.create(dto)).toJSON());
  }

  @Put(':code')
  async update(@Param('code') code: string, @Body() dto: UpdateModuleDto) {
    const m = await this.service.update(code, dto);
    return m ? this.normalizeOut(m.toJSON()) : null;
  }

  @Delete(':code')
  async delete(@Param('code') code: string) {
    await this.service.delete(code);
    return { success: true };
  }
}