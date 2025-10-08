import { Schema, model } from 'mongoose';

const ModuleSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ec: { type: Number, required: true },
    level: { type: String, required: true },
    theme: String,
    description: String,
    keywords: [String],
  },
  { timestamps: true }
);

export const ModuleModel = model('Module', ModuleSchema);