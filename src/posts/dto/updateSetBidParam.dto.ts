import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetBidParamDto {

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  bidprice?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  bidamount?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  startbidprogres?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  endbidprogress?: number;
}

export default UpdateSetBidParamDto;
