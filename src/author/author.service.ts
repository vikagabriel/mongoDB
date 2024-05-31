import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel('Author') private authorModel: Model<Author>, @InjectModel('Book') private bookModel: Model<Book>) { }

  async create(createAuthorDto: CreateAuthorDto) {
    const { name, surname, email } = createAuthorDto
    const author = await this.authorModel.findOne({ email })
    if (author) {
      throw new BadRequestException('Email has already been used')
    } else {
      const auth = await this.authorModel.create({ name, surname, email })
      return auth;
    }
  }

  async findAll() {
    return await this.authorModel.find();
  }

  async findOne(id: string) {
    const author = await this.authorModel.findById(id);
    if (author) {
      return author
    } else {
      throw new NotFoundException('Author not found')
    }
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorModel.findById(id);
    if (author) {
      const { name, surname, email } = updateAuthorDto
      await this.authorModel.findByIdAndUpdate(id, { name, surname, email })
      return await this.authorModel.findById(id)
    } else {
      throw new NotFoundException('Author not found')
    }
  }

  async remove(id: string) {
    const author = await this.authorModel.findById(id).populate('books');
    if (author) {
      await this.authorModel.findByIdAndDelete(id);      
      author.books.forEach(async(el:any) => { await this.bookModel.findByIdAndDelete(el._id) })
      return true
    } else {
      throw new NotFoundException('Author not found')
    }
  }
}
