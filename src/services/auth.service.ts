import { Injectable } from '@nestjs/common'
import { PasswordService } from './password.service'
import UsersService from './users.service'

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserInternal(username)

    if (
      user &&
      (await this.passwordService.validatePassword(pass, user.password))
    ) {
      const { password: _, salt: __, ...result } = user
      return result
    } else {
      return null
    }
  }
}
