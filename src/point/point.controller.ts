import { Controller, Get, Post, Body, UseGuards, Param } from "@nestjs/common";
import { PointService } from "./point.service";
import { CreatePointDto } from "./dto/create-point.dto";

import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/admin.guard";
import { IsAdmin } from "src/auth/admin.decorator";

import { UserInfo } from "src/utils/userInfo.decorator";
import { User } from "src/user/entities/user.entity";

@UseGuards(AuthGuard("jwt"))
@Controller("point")
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @UseGuards(AdminGuard)
  @IsAdmin(true)
  @Post("new/:id")
  addPointHistory(
    @Param("id") id: number,
    @Body() createPointDto: CreatePointDto,
  ) {
    return this.pointService.addPointHistory(id, createPointDto);
  }

  @Get("history")
  getPointHistory(@UserInfo() user: User) {
    return this.pointService.getPointHistory(user.id);
  }

  @Get("mypoint")
  getCurrentPoint(@UserInfo() user: User) {
    return this.pointService.getCurrentPoint(user.id);
  }
}
