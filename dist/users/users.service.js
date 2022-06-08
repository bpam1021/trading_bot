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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const profile_service_1 = require("../profile/profile.service");
let UsersService = class UsersService {
    constructor(usersRepository, profileService) {
        this.usersRepository = usersRepository;
        this.profileService = profileService;
    }
    async getByEmail(email) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new common_1.HttpException("User with this email does not exist", common_1.HttpStatus.NOT_FOUND);
    }
    async getById(id) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new common_1.HttpException("User with this id does not exist", common_1.HttpStatus.NOT_FOUND);
    }
    async getOUsers(id) {
        return this.usersRepository
            .createQueryBuilder()
            .where('id != :ids', { ids: id })
            .execute();
    }
    async create(userData) {
        console.log("arrive1");
        console.log(userData);
        const newUser = await this.usersRepository.create(userData);
        console.log(newUser);
        await this.usersRepository.save(newUser);
        return newUser;
    }
    async updateProfile(id, profileDto) {
        try {
            await this.usersRepository.update(id, profileDto);
        }
        catch (error) {
            return {
                message: 'update failed.', access: false
            };
        }
        const ownuser = await this.usersRepository.findOne(id);
        if (ownuser) {
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
            };
        }
        throw new common_1.HttpException("User with this id does not exist", common_1.HttpStatus.NOT_FOUND);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        profile_service_1.ProfileService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map