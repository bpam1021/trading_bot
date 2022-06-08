import { NotFoundException } from '@nestjs/common';
declare class PostNotFoundException extends NotFoundException {
    constructor(postId: number);
}
export default PostNotFoundException;
