import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './entities/book.entity';
import { AuthorSchema } from 'src/author/entities/author.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Book', schema:BookSchema}, {name: 'Author', schema:AuthorSchema}])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
