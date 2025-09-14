import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { Prisma } from 'src/database/generated/prisma'
import TodosService from 'src/services/todos.service'

@Controller('todos')
export default class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/')
  async getTodos(@Req() req) {
    const result = await this.todosService.getTodos(req.user.id)

    if (result) {
      return result
    }
  }

  @Get('/:id')
  async getTodoDetail(@Req() req, @Param('id') id: string) {
    const result = await this.todosService.getTodoDetail(req.user.id, id)

    if (result) {
      return result
    }
  }

  @Post('/')
  async createTodo(@Req() req, @Body() body: Prisma.TodoCreateInput) {
    const result = await this.todosService.createTodo(req.user.id, body)

    if (result) {
      return result
    }
  }

  @Patch('/:id')
  async updateTodo(
    @Req() req,
    @Param('id') id: string,
    @Body() body: Prisma.TodoUpdateInput
  ) {
    const result = await this.todosService.updateTodo(req.user.id, id, body)

    if (result) {
      return result
    }
  }

  @Delete('/:id')
  async deleteTodo(@Req() req, @Param('id') id: string) {
    const result = await this.todosService.deleteTodo(req.user.id, id)

    if (result) {
      return result
    }
  }
}
