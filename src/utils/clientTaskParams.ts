import { IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class ClientTaskParams {
  @ApiProperty()
  @IsNumberString()
  clientId: string;
  
  @ApiProperty()
  @IsNumberString()
  limit: string;
}
