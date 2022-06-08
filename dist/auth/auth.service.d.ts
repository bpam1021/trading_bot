import { AdminUsersService } from "../adminUsers/admin.users.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import CreateUserDto from "../users/dto/createUser.dto";
export declare class AuthService {
    private readonly adminusersService;
    private readonly jwtService;
    private readonly usersService;
    constructor(adminusersService: AdminUsersService, jwtService: JwtService, usersService: UsersService);
    validateUser(username: string, pass: string): Promise<any>;
    registerUser(dto: CreateUserDto): Promise<{
        access: boolean;
        id: number;
        username: string;
        email: string;
        password: string;
        image: string;
        cellPhone: string;
        officePhone: string;
        address: string;
        birthday: string;
        token: string;
        message?: undefined;
    } | {
        message: string;
        access: boolean;
        id?: undefined;
        username?: undefined;
        email?: undefined;
        password?: undefined;
        image?: undefined;
        cellPhone?: undefined;
        officePhone?: undefined;
        address?: undefined;
        birthday?: undefined;
        token?: undefined;
    }>;
    login(user: any): Promise<{
        message: string;
        access: boolean;
        id?: undefined;
        username?: undefined;
        email?: undefined;
        password?: undefined;
        image?: undefined;
        cellPhone?: undefined;
        officePhone?: undefined;
        address?: undefined;
        birthday?: undefined;
        token?: undefined;
    } | {
        access: boolean;
        id: number;
        username: string;
        email: string;
        password: string;
        image: string;
        cellPhone: string;
        officePhone: string;
        address: string;
        birthday: string;
        token: string;
        message?: undefined;
    }>;
}
