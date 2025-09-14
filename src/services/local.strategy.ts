import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ContextIdFactory, ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/database/generated/prisma'
import AuthService from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    })
  }

  async validate(
    request: Request,
    username: string,
    password: string
  ): Promise<Pick<User, 'id' | 'username' | 'nickname' | 'avatar'>> {
    const contextId = ContextIdFactory.getByRequest(request)
    const authService = await this.moduleRef.resolve(AuthService, contextId)

    const user = await authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
