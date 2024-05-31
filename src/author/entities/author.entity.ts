import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Book } from "src/book/entities/book.entity";

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
    _id:string
    @Prop()
    name:string
    @Prop()
    surname:string
    @Prop()
    email:string
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref: 'Book'}]})
    books:Book[]
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

