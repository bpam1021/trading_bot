import { NotFoundException } from '@nestjs/common';
declare class CategoryNotFoundException extends NotFoundException {
    constructor(postId: number);
}
export default CategoryNotFoundException;
