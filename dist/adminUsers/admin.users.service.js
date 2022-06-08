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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
let AdminUsersService = class AdminUsersService {
    constructor() {
        this.users = [
            {
                userId: 1,
                username: "admin",
                password: "admin",
            },
            {
                userId: 2,
                username: "superman",
                password: "superman",
            },
            {
                userId: 3,
                username: "ironman",
                password: "ironman",
            },
        ];
    }
    async findOne(username) {
        return this.users.find((user) => user.username === username);
    }
};
AdminUsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AdminUsersService);
exports.AdminUsersService = AdminUsersService;
//# sourceMappingURL=admin.users.service.js.map