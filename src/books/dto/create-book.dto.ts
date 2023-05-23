import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  category: string;
  @IsString()
  author: string;
  @IsNumber()
  n_pages: number;
}
