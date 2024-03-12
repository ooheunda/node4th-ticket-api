import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { UserInfo } from "src/utils/userInfo.decorator";
import { User } from "./entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/admin.guard";
import { IsAdmin } from "src/auth/admin.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.userService.signup(signUpUserDto);
  }

  @Post("signin")
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.userService.signin(signInUserDto);
  }

  @UseGuards(AdminGuard)
  @IsAdmin(true)
  @Get("users/:role")
  findAll(@Param("role") role: "admin" | "user" | undefined) {
    return this.userService.findAll(role);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  findOne(@UserInfo() user: User) {
    delete user.deletedAt;
    delete user.is_admin;

    return user;
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
