import { Schema, model } from 'mongoose';

const FavoriteSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    moduleCode: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure a user can only favorite a module once
FavoriteSchema.index({ userEmail: 1, moduleCode: 1 }, { unique: true });

export const FavoriteModel = model('Favorite', FavoriteSchema);
