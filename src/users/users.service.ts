import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";
import CreateUserDto from "./dto/createUser.dto";
import ProfileDto from "./dto/profile.dto";
import { ProfileService } from "../profile/profile.service";
import { CreateProfileDto } from "../profile/dto/createProfile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly profileService: ProfileService
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      "User with this email does not exist",
      HttpStatus.NOT_FOUND
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      "User with this id does not exist",
      HttpStatus.NOT_FOUND
    );
  }


  async getOUsers(id: number) {
    return this.usersRepository
        .createQueryBuilder()
        .where('id != :ids', { ids: id })
        .execute();
        
    // const user = await this.usersRepository.findOne({ id });
    // if (user) {
    //   return user;
    // }
    // throw new HttpException(
    //   "User with this id does not exist",
    //   HttpStatus.NOT_FOUND
    // );
  }

  async create(userData: CreateUserDto) {
    console.log("arrive1");
    console.log(userData);
    const newUser = await this.usersRepository.create(userData);
    console.log(newUser);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateProfile(id: number, profileDto: ProfileDto) {
    try {
    await this.usersRepository.update(id, profileDto);
    } catch (error) { 
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
        // role: user.role,
        // state: user.state,
      };
      return {
        access: true ,
        id: ownuser.id, 
        username: ownuser.name, 
        email:ownuser.email,
        password:ownuser.password,
        image: ownuser.image,
        cellPhone: ownuser.cellPhone,
        officePhone: ownuser.officePhone,
        address: ownuser.address,
        birthday: ownuser.birthday,
      };
    }
    throw new HttpException(
      "User with this id does not exist",
      HttpStatus.NOT_FOUND
    );
  }

}
