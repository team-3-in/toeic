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
  get accessToken(): string {
    return this._accessToken;
  }

  @Expose()
  get expiresIn() {
    return this._expiresIn;
  }

  @Expose()
  get tokenType(): string {
    return this._tokenType;
  }

  @Expose()
  get user(): User {
    return this._user;
  }
}
