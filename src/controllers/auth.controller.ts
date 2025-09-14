import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { Prisma } from 'src/database/generated/prisma'
import { Public } from 'src/decorators/public.decorator'
import { LocalAuthGuard } from 'src/guards/local-auth.guard'
import AuthService from 'src/services/auth.service'

@Controller('/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user)
  }

  @Post('signout')
  async signout(@Request() req) {
    return req
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signup(body)
  }
}
