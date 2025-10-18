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
      // When description is object, search both en/nl fields
      query.$or = [
        { name: r },
        { description: r },
        { 'description.en': r },
        { 'description.nl': r },
        { keywords: r },
        { code: r },
      ];
    }
    const docs = await ModuleModel.find(query).lean();
    return docs.map((d) => Module.create(this.normalizeDoc(d)));
  }
  async findByCode(code: string) {
    const doc = await ModuleModel.findOne({ code }).lean();
    return doc ? Module.create(this.normalizeDoc(doc)) : null;
  }
  async create(module: Module) {
    const data = this.normalizeDoc(module.toJSON());
    await ModuleModel.create(data);
    return module;
  }
  async update(code: string, patch: any) {
    const normalized = this.normalizeDoc(patch);
    const doc = await ModuleModel.findOneAndUpdate({ code }, normalized, { new: true }).lean();
    return doc ? Module.create(this.normalizeDoc(doc)) : null;
  }
  async delete(code: string): Promise<boolean> {
    const res = await ModuleModel.deleteOne({ code });
    return res.deletedCount > 0;
  }

  private normalizeDoc(d: any) {
    const out = { ...d };
    // If description is a string, keep as-is (legacy). If object, ensure only en/nl keys and strings.
    if (out && out.description !== undefined && out.description !== null) {
      if (typeof out.description === 'object' && !Array.isArray(out.description)) {
        const en = typeof out.description.en === 'string' ? out.description.en : undefined;
        const nl = typeof out.description.nl === 'string' ? out.description.nl : undefined;
        out.description = { ...(en ? { en } : {}), ...(nl ? { nl } : {}) };
        // If both missing (bad input), drop description
        if (Object.keys(out.description).length === 0) delete out.description;
      }
      // strings are fine; arrays or other types are dropped
      if (Array.isArray(out.description)) delete out.description;
    }
    return out;
  }
}