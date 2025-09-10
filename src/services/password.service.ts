import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class PasswordService {
  private readonly SALT_ROUNDS = 10

  generateSalt(): string {
    return bcrypt.genSaltSync(this.SALT_ROUNDS)
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async validatePassword(
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    const hashed = await this.hashPassword(password, salt)
    return hashed === hash
  }
}
