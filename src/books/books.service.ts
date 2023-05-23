import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.booksRepository.save(createBookDto);
    } catch (error) {
      this.handleErrorDB(error);
    }
  }
  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: string) {
    return await this.booksRepository.findOneBy({ id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.booksRepository.delete(id);
  }

  private handleErrorDB(error) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check console log');
  }
}
