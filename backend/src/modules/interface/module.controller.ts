import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { ModuleService } from '../application/module.service';
import { CreateModuleDto, UpdateModuleDto } from './module.dto';
import { ModuleFilter } from '../domain/module.repository';

@Controller('modules')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  @Get()
  async list(@Query() q: ModuleFilter) {
    const modules = await this.service.list(q);
    return modules.map((m) => m.toJSON());
  }

  @Get(':code')
  async get(@Param('code') code: string) {
    const m = await this.service.get(code);
    return m?.toJSON();
  }

  @Post()
  async create(@Body() dto: CreateModuleDto) {
    return (await this.service.create(dto)).toJSON();
  }

  @Put(':code')
  async update(@Param('code') code: string, @Body() dto: UpdateModuleDto) {
    return (await this.service.update(code, dto))?.toJSON();
  }
}