import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetAskParamDto {

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  askprice?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  askamount?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  startaskprogres?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  endaskprogress?: number;
}

export default UpdateSetAskParamDto;
