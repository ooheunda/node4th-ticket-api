import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import _ from "lodash";

@Injectable()
export class AdminGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActive(context: ExecutionContext) {
    const authenticated = await super.canActivate(context);
    if (!authenticated) return false;

    const requiredRoles = this.reflector.getAllAndOverride<boolean>(
      "is_admin",
      [context.getHandler(), context.getClass()],
    );
    if (_.isNil(requiredRoles)) return false;

    const { user } = context.switchToHttp().getRequest();
    return user.is_admin;
  }
}
