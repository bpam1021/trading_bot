import { Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { CreateProfileDto } from "./dto/createProfile.dto";
export declare class ProfileService {
    private profileService;
    constructor(profileService: Repository<Profile>);
    createProfile(profile: CreateProfileDto): Promise<CreateProfileDto & Profile>;
}
