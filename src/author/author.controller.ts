import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Response } from 'express';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }

  @Post()
  async addAuthor(@Body() createAuthorDto: CreateAuthorDto, @Res() res: Response) {
    try {
      const data = await this.authorService.create(createAuthorDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get()
  async allAuthor(@Res() res: Response) {
    try {
      const data = await this.authorService.findAll();
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get(':id')
  async getAuthorById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.authorService.findOne(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }

  @Patch(':id')
  async updateAuthorById(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto, @Res() res: Response) {
    try {
      const data = await this.authorService.update(id, updateAuthorDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.authorService.remove(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message })
    }
  }
}
