import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharesModule } from '../shares/shares.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SharesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
