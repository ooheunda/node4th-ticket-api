import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigService } from "@nestjs/config";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./entities/user.entity";
import { PointModule } from "src/point/point.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    PointModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
