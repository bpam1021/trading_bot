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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const createUser_dto_1 = require("./users/dto/createUser.dto");
const login_dto_1 = require("./users/dto/login.dto");
const profile_dto_1 = require("./users/dto/profile.dto");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(logindata) {
        return this.authService.login(logindata);
    }
    async register(registrationData) {
        return this.authService.registerUser(registrationData);
    }
    getProfile(req, profileData) {
        console.log(req);
        console.log(profileData);
    }
    hello() {
        return "hello";
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: 'Login with email and password.',
        description: 'Returns access token when the login is successful. Otherwise BadRequestException will occur.',
    }),
    swagger_1.ApiBody({ type: login_dto_1.default }),
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.default]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    common_1.Post("signup"),
    swagger_1.ApiOperation({ summary: "Create user" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.default]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    common_1.Get("profile"),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ summary: "Update profile" }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.default]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hello", null);
AppController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags("Login"),
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map