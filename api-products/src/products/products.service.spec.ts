import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductRepository;

  const mockProductRepository = {
    find: jest.fn(),
    findById: jest.fn(),
    createAndSave: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductRepository>(ProductRepository);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('S-01 — Create Product Successfully', () => {
    it('should create a product successfully', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        isPremium: true,
        price: 10.99,
      };

      const expectedProduct: Product = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductRepository.createAndSave.mockResolvedValue(expectedProduct);

      const result = await service.create(createDto);

      expect(repository.createAndSave).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedProduct);
      expect(result.id).toBeDefined();
    });
  });

  describe('S-02 — Get All Products', () => {
    it('should return an array of products', async () => {
      const expectedProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          isPremium: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          isPremium: true,
          price: 20.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockProductRepository.find.mockResolvedValue(expectedProducts);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedProducts);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return an empty array when no products exist', async () => {
      mockProductRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('S-03 — Get One Product by ID (Success)', () => {
    it('should return a product by id', async () => {
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const expectedProduct: Product = {
        id: productId,
        name: 'Test Product',
        description: 'Test Description',
        isPremium: true,
        price: 10.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductRepository.findById.mockResolvedValue(expectedProduct);

      const result = await service.findOne(productId);

      expect(repository.findById).toHaveBeenCalledWith(productId);
      expect(result).toEqual(expectedProduct);
    });
  });

  describe('S-04 — Get One Product by ID (Not Found)', () => {
    it('should throw NotFoundException when product does not exist', async () => {
      const productId = 'non-existent-id';

      mockProductRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(productId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(productId)).rejects.toThrow(
        `Product with ID ${productId} not found`,
      );
      expect(repository.findById).toHaveBeenCalledWith(productId);
    });
  });

  describe('S-05 — Update Product Successfully', () => {
    it('should update a product successfully', async () => {
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const existingProduct: Product = {
        id: productId,
        name: 'Old Name',
        description: 'Old Description',
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateDto: UpdateProductDto = {
        name: 'New Name',
        price: 15.99,
      };

      const updatedProduct: Product = {
        ...existingProduct,
        ...updateDto,
        updatedAt: new Date(),
      };

      mockProductRepository.findById.mockResolvedValue(existingProduct);
      mockProductRepository.save.mockResolvedValue(updatedProduct);

      const result = await service.update(productId, updateDto);

      expect(repository.findById).toHaveBeenCalledWith(productId);
      expect(repository.save).toHaveBeenCalled();
      expect(result.name).toBe(updateDto.name);
      expect(result.price).toBe(updateDto.price);
    });
  });

  describe('S-06 — Delete Product Successfully', () => {
    it('should delete a product successfully', async () => {
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const existingProduct: Product = {
        id: productId,
        name: 'Product to Delete',
        description: 'Will be deleted',
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductRepository.findById.mockResolvedValue(existingProduct);
      mockProductRepository.delete.mockResolvedValue(undefined);

      await service.remove(productId);

      expect(repository.findById).toHaveBeenCalledWith(productId);
      expect(repository.delete).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      const productId = 'non-existent-id';

      mockProductRepository.findById.mockResolvedValue(null);

      await expect(service.remove(productId)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith(productId);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
