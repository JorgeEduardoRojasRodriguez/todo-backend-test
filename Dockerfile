# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar OpenSSL y dependencias necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Generar cliente de Prisma
RUN npm run prisma:generate

# Compilar aplicación
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Instalar OpenSSL y dependencias necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar archivos compilados desde builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
