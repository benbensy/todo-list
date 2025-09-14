import { Module } from '@nestjs/common'
import ProfileController from 'src/controllers/profile.controller'
import UsersModule from './users.module'

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
})
export default class ProfileModule {}
