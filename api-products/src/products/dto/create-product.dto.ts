import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new product
 */
export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Premium Coffee' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description', required: false, example: 'High quality arabica coffee' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Is this a premium product', example: true })
  @IsBoolean()
  isPremium: boolean;

  @ApiProperty({ description: 'Price (required if isPremium is true)', required: false, example: 25.5 })
  @ValidateIf((o) => o.isPremium === true)
  @IsNumber()
  @IsNotEmpty()
  price?: number;
}
