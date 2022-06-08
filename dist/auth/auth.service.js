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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_users_service_1 = require("../adminUsers/admin.users.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(adminusersService, jwtService, usersService) {
        this.adminusersService = adminusersService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async validateUser(username, pass) {
        const user = await this.adminusersService.findOne(username);
        if (user && user.password === pass) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async registerUser(dto) {
        try {
            dto.image = "",
                dto.cellPhone = "",
                dto.officePhone = "",
                dto.address = "",
                dto.birthday = "";
            const user = await this.usersService.create(dto);
            console.log("arrive2");
            console.log(user);
            const payload = {
                name: user.name,
                id: user.id,
                email: user.email,
            };
            return {
                access: true,
                id: user.id,
                username: user.name,
                email: user.email,
                password: user.password,
                image: "",
                cellPhone: "",
                officePhone: "",
                address: "",
                birthday: "",
                token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            return {
                message: 'Access denied, invalid Entries.', access: false
            };
        }
    }
    async login(user) {
        console.log(user);
        try {
            const ownuser = await this.usersService.getByEmail(user.email);
            console.log(ownuser);
            if (user.password != ownuser.password) {
                return {
                    message: 'Access denied, incorrect Password.', access: false
                };
            }
            const payload = {
                name: ownuser.name,
                id: ownuser.id,
                email: ownuser.email,
            };
            return {
                access: true,
                id: ownuser.id,
                username: ownuser.name,
                email: ownuser.email,
                password: ownuser.password,
                image: ownuser.image,
                cellPhone: ownuser.cellPhone,
                officePhone: ownuser.officePhone,
                address: ownuser.address,
                birthday: ownuser.birthday,
                token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            return {
                message: 'Access denied, incorrect Email.', access: false
            };
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map