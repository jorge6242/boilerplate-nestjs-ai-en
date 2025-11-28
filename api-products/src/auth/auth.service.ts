import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials
   * @param email - User email
   * @param password - User password
   * @returns User if valid, null otherwise
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    return this.usersService.validateCredentials(email, password);
  }

  /**
   * Register a new user
   * @param email - User email
   * @param password - User password
   * @returns Access token
   */
  async register(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.registerUser(email, password);
    return this.generateToken(user);
  }

  /**
   * Login user
   * @param email - User email
   * @param password - User password
   * @returns Access token
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  /**
   * Generate JWT token for user
   * @param user - User entity
   * @returns Object with access token
   */
  private generateToken(user: User): { accessToken: string } {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
