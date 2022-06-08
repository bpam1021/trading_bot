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
}
export default Post;
