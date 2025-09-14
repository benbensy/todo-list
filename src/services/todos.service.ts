import { Injectable } from '@nestjs/common'
import { omit, pick } from 'es-toolkit'
import { Prisma } from 'src/database/generated/prisma'
import { PrismaService } from './prisma.service'

@Injectable()
export default class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTodos(user_id: string) {
    return this.prismaService.todo.findMany({
      where: { user_id, is_deleted: false },
      omit: {
        is_deleted: true,
        user_id: true,
      },
    })
  }

  async getTodoDetail(user_id: string, id: string) {
    return this.prismaService.todo.findUnique({
      where: { user_id, id, is_deleted: false },
      omit: {
        is_deleted: true,
        user_id: true,
      },
    })
  }
  async createTodo(user_id: string, input: Prisma.TodoCreateInput) {
    return this.prismaService.todo.create({
      data: {
        ...pick(input, [
          'title',
          'content',
          'notes',
          'attachments',
          'tags',
          'deadline',
        ]),
        user_id,
      },
      omit: {
        is_deleted: true,
        user_id: true,
      },
    })
  }

  async updateTodo(user_id: string, id: string, input: Prisma.TodoUpdateInput) {
    const result = await this.prismaService.todo.update({
      data: pick(input, [
        'title',
        'content',
        'notes',
        'attachments',
        'tags',
        'deadline',
      ]),
      where: {
        id,
        user_id,
      },
      omit: {
        is_deleted: true,
        user_id: true,
      },
    })

    if (result) {
      return result
    }
  }

  async deleteTodo(user_id: string, id: string) {
    const result = await this.prismaService.todo.update({
      data: {
        is_deleted: true,
      },
      where: {
        id,
        user_id,
      },
      omit: {
        is_deleted: true,
        user_id: true,
      },
    })

    if (result) {
      return result
    }
  }
}
