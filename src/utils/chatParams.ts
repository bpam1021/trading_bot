import { IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class ChatParams {
  @ApiProperty()
  @IsNumberString()
  sid: string;
  @ApiProperty()
  @IsNumberString()
  rid: string;
}
