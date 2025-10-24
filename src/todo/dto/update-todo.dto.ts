import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Prioridad } from '@prisma/client';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(Prioridad)
  @IsOptional()
  prioridad?: Prioridad;

  @IsBoolean()
  @IsOptional()
  finalizada?: boolean;
}
