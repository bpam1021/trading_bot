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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
const categoryNotFound_exception_1 = require("./exceptions/categoryNotFound.exception");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    getAllCategories() {
        return this.categoriesRepository.find({ relations: ["posts"] });
    }
    async getCategoryById(id) {
        const category = await this.categoriesRepository.findOne(id, {
            relations: ["posts"],
        });
        if (category) {
            return category;
        }
        throw new categoryNotFound_exception_1.default(id);
    }
    async createCategory(category) {
        const newCategory = await this.categoriesRepository.create(category);
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }
    async updateCategory(id, category) {
        await this.categoriesRepository.update(id, category);
        const updatedCategory = await this.categoriesRepository.findOne(id, {
            relations: ["posts"],
        });
        if (updatedCategory) {
            return updatedCategory;
        }
        throw new categoryNotFound_exception_1.default(id);
    }
    async deleteCategory(id) {
        const deleteResponse = await this.categoriesRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new categoryNotFound_exception_1.default(id);
        }
    }
};
CategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
exports.default = CategoriesService;
//# sourceMappingURL=categories.service.js.map