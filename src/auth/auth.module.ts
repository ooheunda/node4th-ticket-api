import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY"),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
