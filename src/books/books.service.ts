import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BooksService');

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const newBook = this.booksRepository.create(createBookDto);
      console.log(newBook);
      return await this.booksRepository.save(newBook);
    } catch (error) {
      this.handleErrorDB(error);
    }
  }
  async findAll(): Promise<Book[]> {
    this.logger.log('Doing something...');
    return await this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    return await this.booksRepository.findOneBy({ id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.booksRepository.delete(id);
  }

  async rawQuery() {
    const books = await this.booksRepository.query('SELECT * FROM BOOKS');
    const { author } = books[0];
    this.logger.log(author);

    console.log(author);
    return { author };
  }

  private handleErrorDB(error) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check console log');
  }
}
