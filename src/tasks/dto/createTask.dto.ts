import { IsString, IsDate, IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
   ownerId: number;

   @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
   status: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty()
  @IsNumber()
  attachFiles?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taskType: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dueDate: Date;
}

export default CreateTaskDto;
