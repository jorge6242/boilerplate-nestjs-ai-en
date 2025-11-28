import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

/**
 * Factory function to create TypeORM configuration
 * @param configService - NestJS ConfigService to access environment variables
 * @returns TypeORM configuration options
 */
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'sqlite',
    database: configService.get<string>('DB_PATH') || 'products.sqlite',
    entities: [Product, User],
    synchronize: false, // Using migrations instead
    logging: true,
  };
};

