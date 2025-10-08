import { ModuleRepository, ModuleFilter } from '../domain/module.repository';
import { Module } from '../domain/module.entity';
import { ModuleModel } from './module.schema';

export class ModuleMongoRepository implements ModuleRepository {
  async findAll(filter: ModuleFilter = {}): Promise<Module[]> {
    const query: Record<string, any> = {};
    if (filter.ec !== undefined) query.ec = filter.ec;
    if (filter.level) query.level = filter.level;
    if (filter.theme) query.theme = filter.theme;
    if (filter.q) {
      const r = new RegExp(filter.q, 'i');
      query.$or = [{ name: r }, { description: r }, { keywords: r }, { code: r }];
    }
    const docs = await ModuleModel.find(query).lean();
    return docs.map((d) => Module.create(d as any));
  }
  async findByCode(code: string) {
    const doc = await ModuleModel.findOne({ code }).lean();
    return doc ? Module.create(doc as any) : null;
  }
  async create(module: Module) {
    await ModuleModel.create(module.toJSON());
    return module;
  }
  async update(code: string, patch: any) {
    const doc = await ModuleModel.findOneAndUpdate({ code }, patch, { new: true }).lean();
    return doc ? Module.create(doc as any) : null;
  }
}