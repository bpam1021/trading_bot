import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UpdateSetStartParamDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  botstartflag?: boolean;
}

export default UpdateSetStartParamDto;
