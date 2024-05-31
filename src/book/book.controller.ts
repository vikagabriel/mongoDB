import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const data = await this.bookService.create(createBookDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get()
  async allBook(@Res() res: Response) {
    try {
      const data = await this.bookService.findAll();
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get('authors/:id')
  async getBooksByAuthorId(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.bookService.findByAuthorId(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get(':id')
  async getBookById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.bookService.findOne(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }

  @Patch(':id')
  async updateBookById(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() res: Response) {
    try {
      const data = await this.bookService.update(id, updateBookDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.bookService.remove(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }
}
