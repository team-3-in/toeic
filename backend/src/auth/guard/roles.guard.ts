import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.authService.getToken(request);
    const payload = this.authService.decodeToken(token);
    const hasRole = this.authService.matchRoles(
      roles,
      payload.app_metadata.userrole,
    );

    if (!hasRole) {
      throw new ForbiddenException('Forbidden');
    }
    return hasRole;
  }
}
