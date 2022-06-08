import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from "@nestjs/common";
import TasksService from "./tasks.service";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";
import FindOneParams from "../utils/findOneParams";
import ClientTaskParams from "../utils/clientTaskParams";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("Tasks")
@Controller("tasks")
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all tasks" })
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // @Get(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({
  //   status: 200,
  //   description: "The found task record",
  // })
  // getTasksById(@Param() { id }: FindOneParams) {
  //   return this.tasksService.getTaskById(Number(id));
  // }

  @Get("clientId=:clientId&limit=:limit")
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get Tasks BY Client" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  getTasksByClientId(@Param() {clientId,limit}: ClientTaskParams) {
    return this.tasksService.getTaskByClientId(Number(clientId),Number(limit));
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create task" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update task" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async updateTask(
    @Param() { id }: FindOneParams,
    @Body() task: UpdateTaskDto
  ) {
    return this.tasksService.updateTask(Number(id), task);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete task" })
  async deleteTask(@Param() { id }: FindOneParams) {
    return this.tasksService.deleteTask(Number(id));
  }
}
