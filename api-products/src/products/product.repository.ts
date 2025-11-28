import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';

/**
 * Custom repository for Product entity
 */
@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product or null if not found
   */
  async findById(id: string): Promise<Product | null> {
    return this.findOne({ where: { id } });
  }

  /**
   * Create and save a new product
   * @param productData - Partial product data
   * @returns Created product
   */
  async createAndSave(productData: Partial<Product>): Promise<Product> {
    const product = this.create(productData);
    return this.save(product);
  }
}
