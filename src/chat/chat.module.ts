import { Module } from '@nestjs/common';
import ChatController from './chat.controller';
import ChatService from './chat.service';
import Chat from './chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
