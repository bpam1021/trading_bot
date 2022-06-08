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
const upload_entity_1 = require("./upload.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postNotFound_exception_1 = require("./exceptions/postNotFound.exception");
let UploadsService = class UploadsService {
    constructor(uploadsRepository) {
        this.uploadsRepository = uploadsRepository;
    }
    getAllTasks() {
        return this.uploadsRepository.find();
    }
    async getTaskById(id) {
        const post = await this.uploadsRepository.findOne(id);
        if (post) {
            return post;
        }
        throw new postNotFound_exception_1.default(id);
    }
    async getTaskByClientId(clientId) {
        const post = await this.uploadsRepository.findOne(clientId);
        if (post) {
            return post;
        }
        throw new postNotFound_exception_1.default(clientId);
    }
    async createTask(task) {
        console.log("create Post:::", task);
        const newPost = await this.uploadsRepository.create(Object.assign({}, task));
        await this.uploadsRepository.save(newPost);
        console.log(newPost);
        return newPost;
    }
    async updateTask(id, task) {
        await this.uploadsRepository.update(id, task);
        const updatedTask = await this.uploadsRepository.findOne(id, {
            relations: ["client"],
        });
        if (updatedTask) {
            return updatedTask;
        }
        throw new postNotFound_exception_1.default(id);
    }
    async deleteTask(id) {
        const deleteResponse = await this.uploadsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new postNotFound_exception_1.default(id);
        }
    }
};
UploadsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(upload_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploadsService);
exports.default = UploadsService;
//# sourceMappingURL=uploads.service.js.map