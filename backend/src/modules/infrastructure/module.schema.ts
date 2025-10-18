import { Schema, model } from 'mongoose';

const ModuleSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ec: { type: Number, required: true },
    level: { type: String, required: true },
    theme: String,
    // Allow description to be either a string (legacy) or an object with language keys
    description: Schema.Types.Mixed,
    keywords: [String],
  },
  { timestamps: true}
);

export const ModuleModel = model('Module', ModuleSchema);