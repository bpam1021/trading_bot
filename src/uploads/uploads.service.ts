import { Injectable } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import Upload from "./upload.entity";
import UpdatePostDto from "./dto/updatePost.dto";
import CreateTaskDto from "./dto/createTask.dto";
import UpdateTaskDto from "./dto/updateTask.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import User from "../users/user.entity";

@Injectable()
export default class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>
  ) {}

  getAllTasks() {
    return this.uploadsRepository.find();
  }

  async getTaskById(id: number) {
    const post = await this.uploadsRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }
  async getTaskByClientId(clientId: number) {
    const post = await this.uploadsRepository.findOne(clientId);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(clientId);
  }
  async createTask(task: CreateTaskDto) {
    console.log("create Post:::", task);
    const newPost = await this.uploadsRepository.create({
      ...task
    });
    await this.uploadsRepository.save(newPost);
    console.log(newPost);

    return newPost;
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    await this.uploadsRepository.update(id, task);
    const updatedTask = await this.uploadsRepository.findOne(id, {
      relations: ["client"],
    });
    if (updatedTask) {
      return updatedTask;
    }
    throw new PostNotFoundException(id);
  }

  async deleteTask(id: number) {
    const deleteResponse = await this.uploadsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
