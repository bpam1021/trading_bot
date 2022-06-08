import { Injectable } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import Task from "./task.entity";
import UpdatePostDto from "./dto/updatePost.dto";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import User from "../users/user.entity";

@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  getAllTasks() {
    return this.tasksRepository.find();
  }

  async getTaskById(id: number) {
    const post = await this.tasksRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }
  async getTaskByClientId(clientId: number,limitnum: number) {
    console.log(clientId);
    console.log(limitnum);
    if(limitnum>0)
    {
      const tasks = await this.tasksRepository
          .createQueryBuilder()
          .where('"clientId" = :ids AND status = :status', { ids: clientId,status: 0 })
          .limit(limitnum)
          .execute();
        return tasks;
    }
    else
    {
      const tasks = await this.tasksRepository
          .createQueryBuilder()
          .where('"clientId" = :ids AND status = :status', { ids: clientId,status: 0 })
          .execute();
        return tasks;
    }

    throw new PostNotFoundException(clientId);
  }
  async createTask(task: CreateTaskDto) {
    console.log("create Post:::", task);
    const newPost = await this.tasksRepository.create({
      ...task
    });
    await this.tasksRepository.save(newPost);
    console.log(newPost);

    return newPost;
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    await this.tasksRepository.update(id, task);
    const updatedTask = await this.tasksRepository.findOne(id);
    if (updatedTask) {
      return updatedTask;
    }
    throw new PostNotFoundException(id);
  }

  async deleteTask(id: number) {
    const deleteResponse = await this.tasksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
