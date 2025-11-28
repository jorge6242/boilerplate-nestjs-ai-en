import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('C-01 — Create Product (Controller → Service)', () => {
    it('should create a product and return the result from service', async () => {
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

      mockProductsService.create.mockResolvedValue(expectedProduct);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedProduct);
    });
  });

  describe('C-02 — Get All Products', () => {
    it('should return an array of products from service', async () => {
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

      mockProductsService.findAll.mockResolvedValue(expectedProducts);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedProducts);
    });
  });

  describe('C-03 — Get Product by ID', () => {
    it('should return a product by id from service', async () => {
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

      mockProductsService.findOne.mockResolvedValue(expectedProduct);

      const result = await controller.findOne(productId);

      expect(service.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(expectedProduct);
    });
  });

  describe('C-04 — Update Product', () => {
    it('should update a product and return the result from service', async () => {
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateProductDto = {
        name: 'Updated Name',
        price: 15.99,
      };

      const updatedProduct: Product = {
        id: productId,
        name: 'Updated Name',
        description: 'Test Description',
        isPremium: true,
        price: 15.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(productId, updateDto);

      expect(service.update).toHaveBeenCalledWith(productId, updateDto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('C-05 — Delete Product', () => {
    it('should delete a product via service', async () => {
      const productId = '123e4567-e89b-12d3-a456-426614174000';

      mockProductsService.remove.mockResolvedValue(undefined);

      await controller.remove(productId);

      expect(service.remove).toHaveBeenCalledWith(productId);
    });

    it('should call service.remove and return void', async () => {
      const productId = 'test-id';

      mockProductsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(productId);

      expect(service.remove).toHaveBeenCalledWith(productId);
      expect(result).toBeUndefined();
    });
  });
});
