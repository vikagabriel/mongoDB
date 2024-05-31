import { ApiProperty } from "@nestjs/swagger"

export class UpdateAuthorDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    surname:string
    @ApiProperty()
    email:string
}
