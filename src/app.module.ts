import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/tnayin_8'), BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
