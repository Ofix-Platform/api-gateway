import {
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class OrderItemDto {
  @IsUUID()
  categoryId: UUID;

  @IsUUID()
  subCategoryId: UUID;

  @IsString()
  @MaxLength(120)
  title: string;

  @IsString()
  @MaxLength(120)
  description: string;

  @IsString()
  location: string;
}
