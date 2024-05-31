import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>, @InjectModel('Author') private authorModel: Model<Author>) { }

  async create(createBookDto: CreateBookDto) {
    const { title, description, authorId } = createBookDto;
    const author = await this.authorModel.findById(authorId)
    if (!author) {
      throw new NotFoundException('Author not found!')
    } else {
      const book = await this.bookModel.create({ title, description, author })
      await this.authorModel.findByIdAndUpdate(authorId, { books: [...author.books, book] })
      return book
    }
  }

  async findAll() {
    return await this.bookModel.find()
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id)
    if (book) {
      return book
    } else {
      throw new NotFoundException('Book not found')
    }
  }

  async findByAuthorId(authorId: string) {
    const author = await this.authorModel.findById(authorId).populate('books')
    if (author) {
      return author.books
    } else {
      throw new NotFoundException('Author not found')
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const { title, description, authorId } = updateBookDto
    const book = await this.bookModel.findById(id)
    if (book) {
      const author = await this.authorModel.findById(authorId)
      console.log("🚀 ~ BookService ~ update ~ author:", author) 
      if (!author) {
        throw new NotFoundException('Author not found!')
      } else {
        await this.bookModel.findByIdAndUpdate(id, { title, description, author })
        return await this.bookModel.findById(id)
      }
    } else {
      throw new NotFoundException('Book not found')
    }
  }

  async remove(id: string) {
    const book = await this.bookModel.findById(id)
    if (book) {
      await this.bookModel.findByIdAndDelete(id)
      const author = await this.authorModel.findById(book.author._id)
      await this.authorModel.findByIdAndUpdate(author._id, { books: author.books.filter(el => el._id != id) })
      return true
    } else {
      throw new NotFoundException('Book not found')
    }
  }
  
}
