import { Repository } from "typeorm";
import User from "./user.entity";
import CreateUserDto from "./dto/createUser.dto";
import ProfileDto from "./dto/profile.dto";
import { ProfileService } from "../profile/profile.service";
export declare class UsersService {
    private usersRepository;
    private readonly profileService;
    constructor(usersRepository: Repository<User>, profileService: ProfileService);
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    getOUsers(id: number): Promise<any>;
    create(userData: CreateUserDto): Promise<User>;
    updateProfile(id: number, profileDto: ProfileDto): Promise<{
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
        message?: undefined;
    }>;
}
