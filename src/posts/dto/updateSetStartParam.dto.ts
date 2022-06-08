import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetStartParamDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  startflag?: boolean;
}

export default UpdateSetStartParamDto;
