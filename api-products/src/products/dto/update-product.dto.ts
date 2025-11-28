import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for updating an existing product
 */
export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', required: false, example: 'Premium Coffee' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Product description', required: false, example: 'High quality arabica coffee' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Is this a premium product', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({ description: 'Price', required: false, example: 25.5 })
  @IsNumber()
  @IsOptional()
  price?: number;
}
