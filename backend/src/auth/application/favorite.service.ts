import { Injectable, Inject } from '@nestjs/common';
import { FavoriteRepository } from '../domain/favorite.repository';
import { Favorite } from '../domain/favorite.entity';
import { FAVORITE_REPO } from '../tokens';

@Injectable()
export class FavoriteService {
  constructor(@Inject(FAVORITE_REPO) private favoriteRepo: FavoriteRepository) {}

  async getUserFavorites(userEmail: string): Promise<string[]> {
    const favorites = await this.favoriteRepo.findByUser(userEmail);
    return favorites.map((f) => f.moduleCode);
  }

  async addFavorite(userEmail: string, moduleCode: string): Promise<void> {
    const existing = await this.favoriteRepo.findOne(userEmail, moduleCode);
    if (existing) {
      return; // Already favorited
    }
    const favorite = Favorite.create({ userEmail, moduleCode });
    await this.favoriteRepo.create(favorite);
  }

  async removeFavorite(userEmail: string, moduleCode: string): Promise<void> {
    await this.favoriteRepo.delete(userEmail, moduleCode);
  }

  async isFavorited(userEmail: string, moduleCode: string): Promise<boolean> {
    const favorite = await this.favoriteRepo.findOne(userEmail, moduleCode);
    return !!favorite;
  }
}
