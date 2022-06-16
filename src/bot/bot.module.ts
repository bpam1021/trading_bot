import { Module } from '@nestjs/common'
import BotService from './bot.service'
import { ConfigModule } from '@nestjs/config'
import PostsService from "../posts/posts.service";
import { PostsModule } from "../posts/posts.module";
// import { SharesModule } from '../shares/shares.module';
// import SharesService from "../shares/shares.service";

@Module({
  imports: [ConfigModule, PostsModule],
  controllers: [],
  exports: [BotService],
  providers: [BotService],
})
export class BotModule {}
