"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class CategoryNotFoundException extends common_1.NotFoundException {
    constructor(postId) {
        super(`Category with id ${postId} not found`);
    }
}
exports.default = CategoryNotFoundException;
//# sourceMappingURL=categoryNotFound.exception.js.map