import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { JwtTokenPayload } from '../token-payload/jwt-token-payload.interface';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${config.get('aws.cognito.authority')}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // audience: config.get('aws.cognito.clientId'),
      issuer: config.get('aws.cognito.authority'),
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: JwtTokenPayload) {
    // console.log(payload);

    //TODO: to be implemented
    //const userId = this.jwtTokenFactoryService.getUserIdFromPayload(payload);
    // const user = userId ? await this.userService.findById(userId) : undefined;
    //  if (user) {
    //    return user;
    //  }
    //throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return new User();
  }
}
