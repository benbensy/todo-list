import { Body, Controller, Get, Patch, Req } from '@nestjs/common'
import { Prisma } from 'src/database/generated/prisma'
import UsersService from 'src/services/users.service'

@Controller('/profile')
export default class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getProfile(@Req() req) {
    const result = await this.usersService.getProfileUserDetail(req.user.id)

    if (result) {
      return result
    }
  }

  @Patch('avatar')
  async updateAvatar(@Req() req, @Body() body: Prisma.UserUpdateInput) {
    const result = await this.usersService.updateAvatar({
      ...body,
      id: req.user.id,
    })

    if (result) {
      return result
    }
  }

  @Patch('nickname')
  async updateNickname(@Req() req, @Body() body: Prisma.UserUpdateInput) {
    const result = await this.usersService.updateAvatar({
      ...body,
      id: req.user.id,
    })

    if (result) {
      return result
    }
  }
}
