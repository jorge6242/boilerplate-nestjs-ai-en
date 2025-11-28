import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Factory function to create JWT configuration
 * @param configService - NestJS ConfigService to access environment variables
 * @returns JWT configuration options
 */
export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => {
  return {
    secret: configService.get<string>('JWT_SECRET') || 'default-secret-key',
    signOptions: {
      expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '1h') as any,
    },
  };
};

