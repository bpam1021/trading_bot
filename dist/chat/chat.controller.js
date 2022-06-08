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
const chat_service_1 = require("./chat.service");
const message_dto_1 = require("./dto/message.dto");
const chatParams_1 = require("../utils/chatParams");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    getAllPosts() {
        return this.chatService.getAllPosts();
    }
    getChatById({ sid, rid }) {
        return this.chatService.getChatById(Number(sid), Number(rid));
    }
    async createMessage(message) {
        return this.chatService.newMessage(message);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ summary: "Get all posts" }),
    swagger_1.ApiResponse({ status: 200, description: "[]" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getAllPosts", null);
__decorate([
    common_1.Get("sender=:sid&receiver=:rid"),
    swagger_1.ApiOperation({ summary: "Get all Chat" }),
    swagger_1.ApiResponse({
        status: 200,
        description: "The found record",
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatParams_1.default]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getChatById", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "Create Message" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.default]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createMessage", null);
ChatController = __decorate([
    swagger_1.ApiBasicAuth(),
    swagger_1.ApiTags("Chat"),
    common_1.Controller("chat"),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [chat_service_1.default])
], ChatController);
exports.default = ChatController;
//# sourceMappingURL=chat.controller.js.map