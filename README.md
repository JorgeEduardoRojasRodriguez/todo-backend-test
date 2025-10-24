# Todo App - Backend

REST API para gestión de tareas desarrollada con NestJS, TypeScript, Prisma y PostgreSQL.

## Requisitos Previos

- Docker y Docker Compose
- Node.js 18+ (solo para ejecución sin Docker)
- PostgreSQL 14+ (solo para ejecución sin Docker)

## Cómo Levantar el Proyecto

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd todo-app-backend
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

3. **Levantar los servicios**
   ```bash
   docker-compose up -d
   ```

   La API estará disponible en `http://localhost:3000`

4. **Detener los servicios**
   ```bash
   docker-compose down
   ```

### Opción 2: Sin Docker

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd todo-app-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus credenciales de PostgreSQL.

4. **Crear la base de datos**
   ```bash
   createdb todoapp
   ```

5. **Ejecutar migraciones**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

6. **Iniciar el servidor**
   ```bash
   npm run start:dev
   ```

   La API estará disponible en `http://localhost:3000`
