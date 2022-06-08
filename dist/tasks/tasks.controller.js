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
const tasks_service_1 = require("./tasks.service");
const createTask_dto_1 = require("./dto/createTask.dto");
const updateTask_dto_1 = require("./dto/updateTask.dto");
const findOneParams_1 = require("../utils/findOneParams");
const clientTaskParams_1 = require("../utils/clientTaskParams");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CategoriesController = class CategoriesController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
    getTasksByClientId({ clientId, limit }) {
        return this.tasksService.getTaskByClientId(Number(clientId), Number(limit));
    }
    async createTask(task) {
        return this.tasksService.createTask(task);
    }
    async updateTask({ id }, task) {
        return this.tasksService.updateTask(Number(id), task);
    }
    async deleteTask({ id }) {
        return this.tasksService.deleteTask(Number(id));
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ summary: "Get all tasks" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAllTasks", null);
__decorate([
    common_1.Get("clientId=:clientId&limit=:limit"),
    swagger_1.ApiOperation({ summary: "Get Tasks BY Client" }),
    swagger_1.ApiResponse({
        status: 200,
        description: "The found record",
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [clientTaskParams_1.default]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getTasksByClientId", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "Create task" }),
    swagger_1.ApiResponse({ status: 403, description: "Forbidden." }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTask_dto_1.default]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createTask", null);
__decorate([
    common_1.Patch(":id"),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ summary: "Update task" }),
    swagger_1.ApiResponse({ status: 403, description: "Forbidden." }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.default,
        updateTask_dto_1.default]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateTask", null);
__decorate([
    common_1.Delete(":id"),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ summary: "Delete task" }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.default]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteTask", null);
CategoriesController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags("Tasks"),
    common_1.Controller("tasks"),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [tasks_service_1.default])
], CategoriesController);
exports.default = CategoriesController;
//# sourceMappingURL=tasks.controller.js.map