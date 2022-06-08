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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Post = class Post {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "fromcurrency", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "tocurrency", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 10 }),
    __metadata("design:type", Number)
], Post.prototype, "bidprice", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 10 }),
    __metadata("design:type", Number)
], Post.prototype, "bidamount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 0.1 }),
    __metadata("design:type", Number)
], Post.prototype, "startbidprogres", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 0.2 }),
    __metadata("design:type", Number)
], Post.prototype, "endbidprogress", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 10.3 }),
    __metadata("design:type", Number)
], Post.prototype, "askprice", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 15 }),
    __metadata("design:type", Number)
], Post.prototype, "askamount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 0.1 }),
    __metadata("design:type", Number)
], Post.prototype, "startaskprogres", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ type: "float", default: 0.2 }),
    __metadata("design:type", Number)
], Post.prototype, "endaskprogress", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Boolean)
], Post.prototype, "startflag", void 0);
Post = __decorate([
    typeorm_1.Entity()
], Post);
exports.default = Post;
//# sourceMappingURL=post.entity.js.map