import { Controller, Get, Post, Request, HttpException,
  HttpStatus,
  Body,
  UseGuards, } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import CreateUserDto from "./users/dto/createUser.dto";
import LoginDto from "./users/dto/login.dto";
import ProfileDto from "./users/dto/profile.dto";
import { TokenResponse } from './common/models/token.response';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
} from "@nestjs/swagger";
import PostgresErrorCode from "./database/postgresErrorCode.enum";
@ApiBearerAuth()
@ApiTags("Login")
@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login with email and password.',
    description:
      'Returns access token when the login is successful. Otherwise BadRequestException will occur.',
  })
  // @ApiOkResponse({ type: TokenResponse, description: 'Returns access token.' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() logindata: LoginDto){
    return this.authService.login(logindata);
  }

  @Post("signup")
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create user" })
  async register(@Body() registrationData: CreateUserDto){
    return this.authService.registerUser(registrationData);
  }
  // @Post('register')
  // @ApiOperation({
  //   summary: 'Register a general user',
  //   description:
  //     'Register a user with email address and full name.\n The new user will have "USER" role.',
  // })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // @UseGuards(LocalAuthGuard)
  // register(@Request() req){
  //   return this.authService.registerUser(req.user);
  // }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update profile" })
  getProfile(@Request() req,@Body() profileData: ProfileDto) {
    //return req.user;
    console.log(req);
    console.log(profileData);
  }
  @Get()
  hello() {
    return "hello";
  }
}
