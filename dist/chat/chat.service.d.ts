import MessageDto from "./dto/message.dto";
import Chat from "./chat.entity";
import UpdatePostDto from "./dto/updatePost.dto";
import { Repository } from "typeorm";
export default class ChatService {
    private chatRepository;
    constructor(chatRepository: Repository<Chat>);
    getAllPosts(): Promise<Chat[]>;
    getChatById(sid: number, rid: number): Promise<any>;
    newMessage(message: MessageDto): Promise<Chat>;
    updatePost(id: number, post: UpdatePostDto): Promise<Chat>;
    deletePost(id: number): Promise<void>;
}
