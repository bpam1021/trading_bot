import ChatService from "./chat.service";
import MessageDto from "./dto/message.dto";
import ChatParams from "../utils/chatParams";
export default class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getAllPosts(): Promise<import("./chat.entity").default[]>;
    getChatById({ sid, rid }: ChatParams): Promise<any>;
    createMessage(message: MessageDto): Promise<import("./chat.entity").default>;
}
