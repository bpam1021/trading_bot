"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./post.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postNotFound_exception_1 = require("./exceptions/postNotFound.exception");
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    getAllPosts() {
        return this.postsRepository.find();
    }
    async getPostById(id) {
        const post = await this.postsRepository.findOne(id);
        if (post) {
            return post;
        }
        throw new postNotFound_exception_1.default(id);
    }
    async createPost(post) {
        console.log("create Post:::", post);
        const newPost = await this.postsRepository.create(Object.assign({}, post));
        await this.postsRepository.save(newPost);
        console.log(newPost);
        return newPost;
    }
    async updatePost(id, post) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOne(id);
        if (updatedPost) {
            return updatedPost;
        }
        throw new postNotFound_exception_1.default(id);
    }
    async deletePost(id) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new postNotFound_exception_1.default(id);
        }
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(post_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
exports.default = PostsService;
//# sourceMappingURL=posts.service.js.map