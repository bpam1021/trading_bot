import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { ConfigModule } from '@nestjs/config'
import PostsService from "../posts/posts.service";
import { PostsModule } from "../posts/posts.module";
@Module({
  imports: [ConfigModule,PostsModule],
  controllers: [],
  providers: [BotService],
})
export class BotModule {}
