import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminUsersModule } from "../adminUsers/admin.users.module";
import { UsersModule } from "../users/users.module";
import User from "../users/user.entity";
import { ProfileModule } from "../profile/profile.module";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    UsersModule,
    AdminUsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

