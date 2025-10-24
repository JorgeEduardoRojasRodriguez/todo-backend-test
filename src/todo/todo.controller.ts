import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@GetUser('id') userId: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(userId, createTodoDto);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  findAll(@GetUser('id') userId: string, @Query() queryDto: QueryTodoDto) {
    return this.todoService.findAll(userId, queryDto);
  }

  @Get('list/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.todoService.findOne(userId, id);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(userId, id, updateTodoDto);
  }

  @Delete('list/:id')
  @HttpCode(HttpStatus.OK)
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.todoService.remove(userId, id);
  }
}
