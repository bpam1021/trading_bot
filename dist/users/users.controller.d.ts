import { UsersService } from "./users.service";
import CreateUserDto from "./dto/createUser.dto";
import ProfileDto from "./dto/profile.dto";
import FindOneParams from "../utils/findOneParams";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(registrationData: CreateUserDto): Promise<import("./user.entity").default>;
    getOUsers({ id }: FindOneParams): Promise<any>;
    updatePost({ id }: FindOneParams, profiledata: ProfileDto): Promise<{
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
    hello(): string;
}
