import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

/**
 * Service for managing products with database persistence
 */
@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Find all products
   * @returns Array of all products
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Find a single product by ID
   * @param id - Product ID
   * @returns The found product
   * @throws NotFoundException if product not found
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Create a new product
   * @param createProductDto - Product creation data
   * @returns The created product
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createAndSave(createProductDto);
  }

  /**
   * Update an existing product
   * @param id - Product ID
   * @param updateProductDto - Product update data
   * @returns The updated product
   * @throws NotFoundException if product not found
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  /**
   * Remove a product
   * @param id - Product ID
   * @throws NotFoundException if product not found
   */
  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.delete(product.id);
  }
}


