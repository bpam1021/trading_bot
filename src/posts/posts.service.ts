import { Injectable } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import Post from "./post.entity";
import UpdateSetAskParamDto from "./dto/updateSetAskParam.dto";
import UpdateSetBidParamDto from "./dto/updateSetBidParam.dto";
import UpdateSetCurrencyDto from "./dto/updateSetCurrency.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import User from "../users/user.entity";

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      return post;
    }
    return false;
  }

  async createPost(post: UpdateSetCurrencyDto) {
    console.log("create Post:::", post);
    const newPost = await this.postsRepository.create({
      ...post,
    });
    await this.postsRepository.save(newPost);
    console.log(newPost);

    return newPost;
  }

  async updatePost(id: number, post: any) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
