import { Favorite } from './favorite.entity';

export interface FavoriteRepository {
  findByUser(userEmail: string): Promise<Favorite[]>;
  findOne(userEmail: string, moduleCode: string): Promise<Favorite | null>;
  create(favorite: Favorite): Promise<Favorite>;
  delete(userEmail: string, moduleCode: string): Promise<void>;
}
