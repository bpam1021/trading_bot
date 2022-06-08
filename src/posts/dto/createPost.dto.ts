import { IsString,IsNumber,IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromcurrency?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tocurrency?: string; 

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bidprice?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bidamount?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  startbidprogres?: number; 

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  endbidprogress?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  askprice?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  askamount?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  startaskprogres?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  endaskprogress?: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  startflag?: boolean;
 
}

export default CreatePostDto;
