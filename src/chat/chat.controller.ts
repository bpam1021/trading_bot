import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import ChatService from "./chat.service";
import MessageDto from "./dto/message.dto";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import FindOneParams from "../utils/findOneParams";
import ChatParams from "../utils/chatParams";
import RequestWithUser from "../auth/interface/requestWithUser";
import {
  ApiBasicAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBasicAuth()
@ApiTags("Chat")
@Controller("chat")
@UseInterceptors(ClassSerializerInterceptor)
export default class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all posts" })
  @ApiResponse({ status: 200, description: "[]" })
  getAllPosts() {
    return this.chatService.getAllPosts();
  }

  @Get("sender=:sid&receiver=:rid")
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all Chat" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  getChatById(@Param() { sid,rid }: ChatParams) {
    return this.chatService.getChatById(Number(sid),Number(rid));
  }

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create Message" })
  async createMessage(
    @Body() message: MessageDto
  ){
    return this.chatService.newMessage(message);
  }

  // @Patch(":id")
  // @UseGuards(JwtAuthGuard)
  // async updatePost(
  //   @Param() { id }: FindOneParams,
  //   @Body() post: UpdatePostDto
  // ) {
  //   return this.chatService.updatePost(Number(id), post);
  // }

  // @Delete(":id")
  // @UseGuards(JwtAuthGuard)
  // async deletePost(@Param() { id }: FindOneParams) {
  //   return this.chatService.deletePost(Number(id));
  // }
}
