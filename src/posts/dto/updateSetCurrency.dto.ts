import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetCurrencyDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fromcurrency?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  tocurrency?: string;
}

export default UpdateSetCurrencyDto;
