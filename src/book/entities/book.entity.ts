import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Author } from "src/author/entities/author.entity";

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    _id:string
    @Prop()
    title:string
    @Prop()
    description:string
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Author'})
    author:Author
}
export const BookSchema = SchemaFactory.createForClass(Book);

