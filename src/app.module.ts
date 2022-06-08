import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AdminUsersModule } from "./adminUsers/admin.users.module";
import { CategoriesModule } from "./categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import Post from "./posts/post.entity";
import User from "./users/user.entity";
import Category from "./categories/category.entity";
import Address from "./users/address.entity";

import { Profile } from "./profile/profile.entity";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { TasksModule } from "./tasks/tasks.module";
import { UploadsModule } from "./uploads/uploads.module";
import { ChatModule } from "./chat/chat.module";
import { BotModule } from "./bot/bot.module";
import { ProfileModule } from "./profile/profile.module";
import { SocketModule } from './socket/socket.module';
import * as ormConfig from './orm.config';
import { SocketGateway } from './socket/socket.gateway';
@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    AdminUsersModule,
    PostsModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService,SocketGateway],
})
export class AppModule {}
