import PostsService from "./posts.service";
import CreatePostDto from "./dto/createPost.dto";
import UpdateSetAskParamDto from "./dto/updateSetAskParam.dto";
import UpdateSetBidParamDto from "./dto/updateSetBidParam.dto";
import UpdateSetCurrencyDto from "./dto/updateSetCurrency.dto";
import UpdateSetStartParamDto from "./dto/updateSetStartParam.dto";
export default class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): Promise<import("./post.entity").default[]>;
    createPost(post: UpdateSetCurrencyDto): Promise<CreatePostDto>;
    setBid(biddata: UpdateSetBidParamDto): Promise<import("./post.entity").default>;
    setAsk(askdata: UpdateSetAskParamDto): Promise<import("./post.entity").default>;
    setStartandStop(startdata: UpdateSetStartParamDto): Promise<import("./post.entity").default>;
    getEnableCurrencies(): Promise<any>;
    cancelallorders(): Promise<boolean>;
    getEnableOrders(): Promise<any>;
}
