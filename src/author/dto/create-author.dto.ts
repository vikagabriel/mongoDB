import { ApiProperty } from "@nestjs/swagger"

export class CreateAuthorDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    surname:string
    @ApiProperty()
    email:string
}
