import { Injectable } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import MessageDto from "./dto/message.dto";
import Chat from "./chat.entity";
import UpdatePostDto from "./dto/updatePost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import User from "../users/user.entity";

@Injectable()
export default class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>
  ) {}

  getAllPosts() {
    return this.chatRepository.find({ relations: ["author"] });
  }

  async getChatById(sid: number,rid: number) {
    console.log(sid);
    console.log(rid);
    const messages = await this.chatRepository.createQueryBuilder()
    .where("(sender = :sender AND reciever = :reciever) OR (sender = :ssender AND reciever = :sreciever)", {sender: sid, reciever:rid, ssender: rid, sreciever:sid})
    .execute();
    console.log(messages);
    return messages;
    throw new PostNotFoundException(sid);
  }

  async newMessage(message: MessageDto) {
    const newPost = await this.chatRepository.create(message);
    await this.chatRepository.save(newPost);
    console.log(newPost);

    return newPost;
  }

  // async createPost(post: CreatePostDto, user: User) {
  //   console.log("create Post:::", post);
  //   console.log("create Post:::", user);
  //   const newPost = await this.chatRepository.create({
  //     ...post,
  //     sender: user,
  //   });
  //   await this.chatRepository.save(newPost);
  //   console.log(newPost);

  //   return newPost;
  // }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.chatRepository.update(id, post);
    const updatedPost = await this.chatRepository.findOne(id, {
      relations: ["author"],
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.chatRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
