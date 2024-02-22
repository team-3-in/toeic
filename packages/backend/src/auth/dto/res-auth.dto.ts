import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@supabase/supabase-js';
import { Exclude, Expose } from 'class-transformer';

export class AuthResponse {
  @Exclude() private readonly _accessToken: string;
  @Exclude() private readonly _refreshToken: string;
  @Exclude() private readonly _expiresIn: number;
  @Exclude() private readonly _tokenType: string;
  @Exclude() private readonly _email: string;

  constructor(data: Session, email?: string) {
    this._accessToken = data.access_token;
    this._refreshToken = data.refresh_token;
    this._expiresIn = data.expires_in;
    this._tokenType = data.token_type;
    this._email = email;
  }

  @Expose()
  @ApiProperty({
    description: '로그인이 성공한 후 반환된 Access Token 입니다.',
  })
  get accessToken(): string {
    return this._accessToken;
  }

  @Exclude()
  @ApiProperty({
    description: '로그인이 성공한 후 반환된 Refresh Token 입니다.',
  })
  get refreshToken(): string {
    return this._refreshToken;
  }

  @Expose()
  @ApiProperty({
    description: 'Access Token의 만료 시간입니다.',
  })
  get expiresIn(): number {
    return this._expiresIn;
  }

  @Expose()
  @ApiProperty({
    description: 'Access Token의 타입입니다.',
  })
  get tokenType(): string {
    return this._tokenType;
  }

  @Expose()
  get email(): string | null {
    return this._email;
  }
}
