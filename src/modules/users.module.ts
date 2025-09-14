import { Module } from '@nestjs/common'
import { PasswordService } from 'src/services/password.service'
import UsersService from 'src/services/users.service'

@Module({
  providers: [UsersService, PasswordService],
  exports: [UsersService],
})
export default class UsersModule {}
