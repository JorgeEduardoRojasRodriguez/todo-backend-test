import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Prioridad } from '@prisma/client';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(Prioridad)
  @IsNotEmpty()
  prioridad: Prioridad;
}
