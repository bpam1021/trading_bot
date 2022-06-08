import { IsString,IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class MessageDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sender: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  reciever: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  time: string;
}

export default MessageDto;
