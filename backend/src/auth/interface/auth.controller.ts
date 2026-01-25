import { Controller, Post, Body, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { JwtAuthGuard } from '../application/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
    );
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteSelf(@Request() req: any) {
    const email = req.user.email;
    await this.authService.deleteUser(email);
    return { success: true };
  }
}
