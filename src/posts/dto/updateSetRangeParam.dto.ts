import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetRangeParamDto {

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stime?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  etime?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price_rate?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ytime?: number;
}

export default UpdateSetRangeParamDto;
