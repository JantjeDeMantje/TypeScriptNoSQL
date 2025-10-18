import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './interface/auth.controller';
import { FavoriteController } from './interface/favorite.controller';
import { AuthService } from './application/auth.service';
import { FavoriteService } from './application/favorite.service';
import { JwtStrategy } from './application/jwt.strategy';
import { UserMongoRepository } from './infrastructure/user.mongo.repository';
import { FavoriteMongoRepository } from './infrastructure/favorite.mongo.repository';
import { USER_REPO, FAVORITE_REPO } from './tokens';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController, FavoriteController],
  providers: [
    AuthService,
    FavoriteService,
    JwtStrategy,
    {
      provide: USER_REPO,
      useClass: UserMongoRepository,
    },
    {
      provide: FAVORITE_REPO,
      useClass: FavoriteMongoRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
