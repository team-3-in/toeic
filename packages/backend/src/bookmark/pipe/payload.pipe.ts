import { Injectable, PipeTransform } from '@nestjs/common';
import { AuthToken } from '../../auth/dto/req-auth-token.dto';
import { AuthService } from '../../auth/auth.service';

/**
 * Validator supports service container in the case if want to inject dependencies into your custom validator constraint classes
 * @see also https://github.com/leosuncin/nest-api-example/blob/master/src/blog/pipes/article.pipe.ts
 * @see also https://github.com/typestack/class-validator?tab=readme-ov-file#using-service-container
 * @see also https://docs.nestjs.com/techniques/validation
 */
@Injectable()
export class ParseUserIdPipe
  implements PipeTransform<AuthToken, Promise<string>>
{
  constructor(private readonly authService: AuthService) {}

  async transform(value: AuthToken) {
    const payload = this.authService.decodeToken(value.accessToken);
    return payload.sub;
  }
}
