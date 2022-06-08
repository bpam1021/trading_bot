import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PostsService from "../posts/posts.service";
export declare class BotService implements OnModuleInit {
    private configService;
    private readonly postsService;
    private readonly logger;
    constructor(configService: ConfigService, postsService: PostsService);
    onModuleInit(): void;
    getRandom(min: any, max: any): any;
    run(): Promise<void>;
}
