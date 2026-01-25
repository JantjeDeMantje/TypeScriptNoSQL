import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../application/jwt-auth.guard';
import { FavoriteService } from '../application/favorite.service';
import { AuthenticatedRequest } from './authenticated-request.interface';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async getUserFavorites(@Request() req: AuthenticatedRequest) {
    const userEmail = req.user.email;
    return this.favoriteService.getUserFavorites(userEmail);
  }

  @Post(':moduleCode')
  async addFavorite(@Request() req: AuthenticatedRequest, @Param('moduleCode') moduleCode: string) {
    const userEmail = req.user.email;
    await this.favoriteService.addFavorite(userEmail, moduleCode);
    return { message: 'Module added to favorites' };
  }

  @Delete(':moduleCode')
  async removeFavorite(@Request() req: AuthenticatedRequest, @Param('moduleCode') moduleCode: string) {
    const userEmail = req.user.email;
    await this.favoriteService.removeFavorite(userEmail, moduleCode);
    return { message: 'Module removed from favorites' };
  }
}
