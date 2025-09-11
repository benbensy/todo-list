import { Global, Module } from '@nestjs/common'
import AuthController from 'src/controllers/auth.controller'
import AuthService from 'src/services/auth.service'
import { LocalStrategy } from 'src/services/local.strategy'
import { PasswordService } from 'src/services/password.service'
import UsersModule from './users.module'

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PasswordService],
})
export default class AuthModule {}
