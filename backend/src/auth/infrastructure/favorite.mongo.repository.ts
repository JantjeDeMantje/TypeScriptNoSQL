import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../domain/favorite.repository';
import { Favorite } from '../domain/favorite.entity';
import { FavoriteModel } from './favorite.schema';

@Injectable()
export class FavoriteMongoRepository implements FavoriteRepository {
  async findByUser(userEmail: string): Promise<Favorite[]> {
    const docs = await FavoriteModel.find({ userEmail }).sort({ createdAt: -1 });
    return docs.map((doc) =>
      Favorite.create({
        userEmail: doc.userEmail,
        moduleCode: doc.moduleCode,
        createdAt: doc.createdAt,
      })
    );
  }

  async findOne(userEmail: string, moduleCode: string): Promise<Favorite | null> {
    const doc = await FavoriteModel.findOne({ userEmail, moduleCode });
    if (!doc) return null;
    return Favorite.create({
      userEmail: doc.userEmail,
      moduleCode: doc.moduleCode,
      createdAt: doc.createdAt,
    });
  }

  async create(favorite: Favorite): Promise<Favorite> {
    const doc = new FavoriteModel({
      userEmail: favorite.userEmail,
      moduleCode: favorite.moduleCode,
    });
    await doc.save();
    return Favorite.create({
      userEmail: doc.userEmail,
      moduleCode: doc.moduleCode,
      createdAt: doc.createdAt,
    });
  }

  async delete(userEmail: string, moduleCode: string): Promise<void> {
    await FavoriteModel.deleteOne({ userEmail, moduleCode });
  }
}
