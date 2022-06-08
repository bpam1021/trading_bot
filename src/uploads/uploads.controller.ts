import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Res,
  Patch,
  UseGuards,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from "@nestjs/common";
import UploadsService from "./uploads.service";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";
import FindOneParams from "../utils/findOneParams";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("Uploads")
@Controller("uploads")
@UseInterceptors(ClassSerializerInterceptor)
export default class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @ApiOperation({ summary: "Upload single file" })
  @ApiResponse({
      status: 200,
      description: "The upload record",
    })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @ApiOperation({ summary: "Upload multiple files" })
  @ApiResponse({
    status: 200,
    description: "The upload mutliple record",
  })
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      })
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
  
  @Get(':filepath')
  @ApiOperation({ summary: "Get file" })
  @ApiResponse({
    status: 200,
    description: "The found file record",
  })
  seeUploadedFile(@Param('filepath') filepath, @Res() res) {
    return res.sendFile(filepath, { root: './files' });
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Get all tasks" })
  // getAllTasks() {
  //   return this.uploadsService.getAllTasks();
  // }

  // @Get(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 200,
  //   description: "The found task record",
  // })
  // getTasksById(@Param() { id }: FindOneParams) {
  //   return this.uploadsService.getTaskById(Number(id));
  // }

  // @Get("client=:id")
  // //@UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Get Tasks BY Client" })
  // @ApiResponse({
  //   status: 200,
  //   description: "The found record",
  // })
  // getTasksByClientId(@Param() id: FindOneParams) {
  //   return this.uploadsService.getTaskByClientId(Number(id));
  // }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Create task" })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // async createTask(@Body() task: CreateTaskDto) {
  //   return this.uploadsService.createTask(task);
  // }

  // @Patch(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Update task" })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // async updateTask(
  //   @Param() { id }: FindOneParams,
  //   @Body() task: UpdateTaskDto
  // ) {
  //   return this.uploadsService.updateTask(Number(id), task);
  // }

  // @Delete(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: "Delete task" })
  // async deleteTask(@Param() { id }: FindOneParams) {
  //   return this.uploadsService.deleteTask(Number(id));
  // }
}
