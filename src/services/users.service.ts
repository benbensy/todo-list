import { Injectable } from '@nestjs/common'
import { Prisma } from 'src/database/generated/prisma'
import { PasswordService } from './password.service'
import { PrismaService } from './prisma.service'

@Injectable()
export default class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  async getProfileUserDetail(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: {
        password: true,
        is_deleted: true,
        is_locked: true,
      },
    })
  }

  async getUserDetail(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    })
  }

  async getUserInternal(username: string) {
    return this.prismaService.user.findUnique({ where: { username } })
  }

  async createUser(input: Prisma.UserCreateInput) {
    const salt = this.passwordService.generateSalt()
    const password = await this.passwordService.hashPassword(
      input.password,
      salt
    )
    return await this.prismaService.user.create({
      data: {
        username: input.username,
        password,
      },
    })
  }

  async updateNickName(input: Prisma.UserUpdateInput) {
    const result = await this.prismaService.user.update({
      data: input,
      select: {
        nickname: true,
      },
      where: {
        id: input.id as string,
      },
    })

    if (result) {
      return result
    }
  }

  async updateAvatar(input: Prisma.UserUpdateInput) {
    const result = await this.prismaService.user.update({
      data: input,
      select: {
        avatar: true,
      },
      where: {
        id: input.id as string,
      },
    })

    if (result) {
      return result
    }
  }
}
