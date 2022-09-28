import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: Prisma.todosUncheckedCreateInput) {
    createTodoDto.is_active = true;
    createTodoDto.priority = 'very-high';
    const todo = await this.prismaService.todos.create({
      data: createTodoDto,
    });
    delete todo.deleted_at;
    return todo;
  }

  async findAll() {
    const data = await this.prismaService.todos.findMany({
      select: {
        id: true,
        title: true,
        activity_group_id: true,
        is_active: true,
        priority: true,
      },
      where: { deleted_at: null },
    });
    return { total: data.length, data: data };
  }

  async findOne(id: number) {
    const data = await this.prismaService.todos.findFirst({
      where: { id, deleted_at: null },
    });
    delete data.deleted_at;
    return data;
  }

  async update(id: number, updateActivityDto: Prisma.todosUpdateInput) {
    updateActivityDto.updated_at = new Date();
    try {
      const data = await this.prismaService.todos.update({
        where: { id },
        data: updateActivityDto,
      });
      delete data.deleted_at;
      return data;
    } catch (error) {
      return new HttpException(
        {
          status: 'Not Found',
          message: 'Todo with ID' + id.toString() + 'Not Found',
        },
        404,
      );
    }
  }

  async remove(id: number) {
    const data = await this.prismaService.todos.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    if (data.deleted_at == null) {
      return {}
    }
    return new HttpException(
      {
        status: 'Not Found',
        message: 'Todo with ID ' + id.toString() + ' Not Found',
      },
      404,
    );
  }
}
