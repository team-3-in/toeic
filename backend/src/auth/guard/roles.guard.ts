import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtservice: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    const payload = this.decodeToken(token);

    return this.matchRoles(roles, payload.role);
  }

  matchRoles(roles: string[], userRole: string): boolean {
    if (!userRole) {
      throw new ForbiddenException(`Forbidden ${userRole}`);
    }
    return roles.includes(userRole);
  }

  private getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }
    return authorization.split(' ')[1];
  }

  private decodeToken(token: string): Payload {
    const payload = this.jwtservice.verify(token, {
      secret: process.env.SUPABASE_JWT_SECRET,
    });
    if (!payload) {
      throw new UnauthorizedException('Invalid Token');
    }
    return payload;
  }
}
