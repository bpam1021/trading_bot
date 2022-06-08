import { Injectable } from "@nestjs/common";
import { AdminUsersService } from "../adminUsers/admin.users.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { TokenResponse } from '../common/models/token.response';
import CreateUserDto from "../users/dto/createUser.dto";
import LoginDto from "../users/dto/login.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly adminusersService: AdminUsersService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
    
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminusersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async registerUser(
    dto: CreateUserDto
  ){
    try {
      dto.image= "",
      dto.cellPhone= "",
      dto.officePhone= "",
      dto.address= "",
      dto.birthday= "";
      const user = await this.usersService.create(dto);
      console.log("arrive2");
      console.log(user);
      const payload = {
        name: user.name,
        id: user.id,
        email: user.email,
        // role: user.role,
        // state: user.state,
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
  async login(user: any) {
    console.log(user);
    try {
      const ownuser = await this.usersService.getByEmail(user.email);
      console.log(ownuser);
      if(user.password != ownuser.password)
      {
        return {
          message: 'Access denied, incorrect Password.', access: false 
        };
      }
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
        token: this.jwtService.sign(payload),
      };
    } catch (error) { 
      return {
        message: 'Access denied, incorrect Email.', access: false 
      };
    }
  }
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
