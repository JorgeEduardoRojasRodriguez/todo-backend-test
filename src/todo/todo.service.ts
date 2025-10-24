import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTodoDto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
      select: {
        id: true,
        nombre: true,
        prioridad: true,
        finalizada: true,
        fechaCreacion: true,
        fechaActualizacion: true,
      },
    });

    return {
      message: 'Tarea creada exitosamente',
      todo,
    };
  }

  async findAll(userId: string, queryDto: QueryTodoDto) {
    const { page = 1, limit = 10, prioridad, finalizada } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (prioridad !== undefined) {
      where.prioridad = prioridad;
    }

    if (finalizada !== undefined) {
      where.finalizada = finalizada;
    }

    const [todos, total] = await Promise.all([
      this.prisma.todo.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          fechaCreacion: 'desc',
        },
        select: {
          id: true,
          nombre: true,
          prioridad: true,
          finalizada: true,
          fechaCreacion: true,
          fechaActualizacion: true,
        },
      }),
      this.prisma.todo.count({ where }),
    ]);

    return {
      data: todos,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        prioridad: true,
        finalizada: true,
        fechaCreacion: true,
        fechaActualizacion: true,
        userId: true,
      },
    });

    if (!todo) {
      throw new NotFoundException('Tarea no encontrada');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta tarea');
    }

    const { userId: _, ...todoData } = todo;

    return todoData;
  }

  async update(userId: string, id: string, updateTodoDto: UpdateTodoDto) {
    await this.findOne(userId, id);

    const todo = await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
      select: {
        id: true,
        nombre: true,
        prioridad: true,
        finalizada: true,
        fechaCreacion: true,
        fechaActualizacion: true,
      },
    });

    return {
      message: 'Tarea actualizada exitosamente',
      todo,
    };
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.todo.delete({
      where: { id },
    });

    return {
      message: 'Tarea eliminada exitosamente',
    };
  }
}
