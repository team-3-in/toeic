import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserResponse } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { CredentialProps, Payload } from './auth.interface';
import { AuthResponse } from './dto/res-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './constant/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtservice: JwtService,
  ) {}

  async signInWith(credentials: CredentialProps): Promise<AuthResponse> {
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword(credentials);
    this.supabaseService.authFail(error);
    return new AuthResponse(data.session, credentials.email);
  }

  async signUpWith(credentials: CredentialProps): Promise<void> {
    const { data, error } =
      await this.supabaseService.client.auth.signUp(credentials);
    const invalidRoles = [Role.INVALID];
    this.supabaseService.authFail(error);
    if (this.matchRoles(invalidRoles, data.user.role)) {
      throw new ConflictException('This email already registered');
    }
  }

  async refreshSession(
    refreshToken: string,
    accessToken: string,
  ): Promise<AuthResponse> {
    const { data, error } = await this.supabaseService.client.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    this.supabaseService.authFail(error);
    return new AuthResponse(data.session);
  }

  getToken(request: Request): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }
    return authorization.split(' ')[1];
  }

  decodeToken(token: string): Payload {
    const payload = this.jwtservice.verify<Payload>(token, {
      secret: process.env.SUPABASE_JWT_SECRET,
    });
    if (!payload) {
      throw new UnauthorizedException('Invalid Token');
    }
    return payload;
  }

  matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }

  getCurrentUser(): Promise<UserResponse> {
    return this.supabaseService.client.auth.getUser();
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.client.auth.signOut();
    this.supabaseService.authFail(error);
  }
}
