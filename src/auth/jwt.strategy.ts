import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserByEmail(payload.email);
    if (_.isNil(user))
      throw new NotFoundException("해당 이메일로 가입된 유저가 없습니다.");

    return user;
  }
}
