import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { pick } from 'es-toolkit'
import { Prisma, User } from 'src/database/generated/prisma'
import { PasswordService } from './password.service'
import UsersService from './users.service'

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserInternal(username)

    if (
      user &&
      (await this.passwordService.validatePassword(pass, user.password))
    ) {
      const result = pick(user, ['id', 'username', 'nickname', 'avatar'])
      return result
    } else {
      return null
    }
  }

  async signin(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signup(userPayload: Prisma.UserCreateInput) {
    if (userPayload.username === 'admin') {
      throw new ConflictException('用户名不能为 admin')
    }

    const existedUser = await this.usersService.getUserInternal(
      userPayload.username
    )

    if (existedUser) {
      throw new ConflictException('用户已存在')
    } else {
      const newUser = await this.usersService.createUser(userPayload)

      const result = pick(newUser, ['id', 'username', 'created_at'])
      return result
    }
  }
}
