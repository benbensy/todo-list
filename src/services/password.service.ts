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

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
