import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Injectable()
export default class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserInternal(username: string) {
    return this.prismaService.user.findUnique({ where: { username } })
  }
}
