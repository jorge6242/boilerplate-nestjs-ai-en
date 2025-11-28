import { DataSource } from 'typeorm';
import { Product } from './src/products/product.entity';
import { User } from './src/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || 'products.sqlite',
  entities: [Product, User],
  migrations: ['migrations/*.ts'],
  synchronize: false,
  logging: true,
});

