import Post from "./post.entity";
import UpdateSetCurrencyDto from "./dto/updateSetCurrency.dto";
import { Repository } from "typeorm";
export default class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    getAllPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post>;
    createPost(post: UpdateSetCurrencyDto): Promise<Post>;
    updatePost(id: number, post: any): Promise<Post>;
    deletePost(id: number): Promise<void>;
}
