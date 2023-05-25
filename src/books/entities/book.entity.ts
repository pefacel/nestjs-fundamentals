import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  category: string;

  @Column('text')
  author: string;

  @Column('int')
  n_pages: number;

  @Column('text', { nullable: true })
  slug: string;

  @BeforeInsert()
  createSlug() {
    this.slug = this.author.toLocaleLowerCase().trim().replaceAll(' ', '-');
  }
}
