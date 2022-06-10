declare class Post {
    id: number;
    fromcurrency: string;
    tocurrency: string;
    bidprice: number;
    bidamount: number;
    startbidprogres: number;
    endbidprogress: number;
    askprice: number;
    askamount: number;
    startaskprogres: number;
    endaskprogress: number;
    startflag: boolean;
    stime: number;
    etime: number;
    price_rate: number;
    ytime: number;
}
export default Post;
