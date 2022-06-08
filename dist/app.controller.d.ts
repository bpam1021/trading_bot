import { AuthService } from "./auth/auth.service";
import CreateUserDto from "./users/dto/createUser.dto";
import LoginDto from "./users/dto/login.dto";
import ProfileDto from "./users/dto/profile.dto";
export declare class AppController {
    private readonly authService;
    constructor(authService: AuthService);
    login(logindata: LoginDto): Promise<{
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
    register(registrationData: CreateUserDto): Promise<{
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
    getProfile(req: any, profileData: ProfileDto): void;
    hello(): string;
}
