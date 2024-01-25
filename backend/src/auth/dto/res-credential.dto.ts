import { ApiProperty } from '@nestjs/swagger';
import { Session, User } from '@supabase/supabase-js';
import { Exclude, Expose } from 'class-transformer';

export class CredentialResponse {
  @Exclude() private readonly _accessToken: string;
  @Exclude() private readonly _expiresIn: number;
  @Exclude() private readonly _tokenType: string;
  @Exclude() private readonly _user: User;

  constructor(data: Session) {
    this._accessToken = data.access_token;
    this._expiresIn = data.expires_in;
    this._tokenType = data.token_type;
    this._user = data.user;
  }

  @Expose()
  @ApiProperty({
    description: '로그인이 성공한 후 반환된 Access Token 입니다.',
  })
  get accessToken(): string {
    return this._accessToken;
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
  @ApiProperty({
    description: '현재 로그인한 유저 정보입니다.',
  })
  get user(): User {
    return this._user;
  }
}
