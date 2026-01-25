import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { USER_REPO } from '../tokens';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

// Mock bcrypt
const mockCompare = jest.fn();
const mockHash = jest.fn();

jest.mock('bcrypt', () => ({
  compare: (...args) => mockCompare(...args),
  hash: (...args) => mockHash(...args),
}));

const mockUserRepo = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(() => 'test-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: USER_REPO, useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw ConflictException if user exists', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ email: 'test@example.com' });
      await expect(service.register('test@example.com', 'pw', 'F', 'L')).rejects.toThrow(ConflictException);
    });

    it('should create user and return token', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null);
      mockHash.mockResolvedValue('hashed_pw');
      const mockUser = {
        email: 'test@example.com',
        toJSON: () => ({ email: 'test@example.com' }),
      };
      mockUserRepo.create.mockResolvedValue(mockUser);
      
      const result = await service.register('test@example.com', 'pw', 'F', 'L');
      
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
      expect(mockUserRepo.create).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null);
      await expect(service.login('test@example.com', 'pw')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password invalid', async () => {
      const mockUser = {
        email: 'test@example.com',
        passwordHash: 'hashed',
        toJSON: () => ({ email: 'test@example.com' }),
      };
      mockUserRepo.findByEmail.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(false);

      await expect(service.login('test@example.com', 'wrong')).rejects.toThrow(UnauthorizedException);
    });

    it('should return token if credentials valid', async () => {
      const mockUser = {
        email: 'test@example.com',
        passwordHash: 'hashed',
        toJSON: () => ({ email: 'test@example.com' }),
      };
      mockUserRepo.findByEmail.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true);

      const result = await service.login('test@example.com', 'pw');
      expect(result).toHaveProperty('token');
    });
  });
});
