import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { USER_REPO } from '../tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPO) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, firstName: string, lastName: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = User.create({ email, passwordHash, firstName, lastName });
    const created = await this.userRepo.create(user);

    const token = this.jwtService.sign({ email: created.email });
    return {
      user: created.toJSON(),
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ email: user.email });
    return {
      user: user.toJSON(),
      token,
    };
  }

  async validateUser(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
}
