import { UsersService } from "./users.service";
import {
  Controller,
  Post,
  Put,
  Patch,
  Get,
  HttpException,
  HttpStatus,
  Request,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import CreateUserDto from "./dto/createUser.dto";
import ProfileDto from "./dto/profile.dto";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProfileDto } from "../profile/dto/createProfile.dto";
import FindOneParams from "../utils/findOneParams";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create user" })
  async register(@Body() registrationData: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  //@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all Users" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  getOUsers(@Param() { id }: FindOneParams) {
    return this.usersService.getOUsers(Number(id));
  }

  @Patch(":id")
//  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() profiledata: ProfileDto
  ) {
    return this.usersService.updateProfile(Number(id), profiledata);
  }

//   @Post("updateprofile")
// //  @UseGuards(JwtAuthGuard)
//   @ApiOperation({ summary: "update user profile" })
//   async createProfile(@Body() post: CreateProfileDto) {
//     return this.usersService.createProfile(post);
//   }
  @Get()
  hello() {
    return "hello";
  }
}
