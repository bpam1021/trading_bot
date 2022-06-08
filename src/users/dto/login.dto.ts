import { ApiProperty } from "@nestjs/swagger";

export default class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
