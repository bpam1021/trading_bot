import { ApiProperty } from "@nestjs/swagger";

export default class ProfileDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  cellPhone?: string;

  @ApiProperty()
  officePhone?: string;
  
  @ApiProperty()
  address?: string;
  
  @ApiProperty()
  birthday?: string;
}
