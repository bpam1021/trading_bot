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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bidprice?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bidamount?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  startbidprogres?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  endbidprogress?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  askprice?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  askamount?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  startaskprogres?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  endaskprogress?: number;

}

export default UpdateSetCurrencyDto;
