import { ApiProperty } from "@nestjs/swagger"

export class UpdateBookDto {
    @ApiProperty()
    title:string
    @ApiProperty()
    description:string
    @ApiProperty()
    authorId:string
}
