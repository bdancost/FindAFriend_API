// src/database/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // evita erro de lint/TS ao criar uma variável global para o Prisma em ambiente de desenvolvimento
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

/**
 * Criamos uma única instância de PrismaClient e a reutilizamos.
 * Isso evita criação de múltiplas conexões quando o Node faz hot-reload (ex.: tsx / nodemon).
 */
export const prisma =
  global.prisma ??
  new PrismaClient({
    // Em dev é útil ver as queries no console; em produção limitamos os logs.
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  })

// Em dev, armazenamos no global para evitar criar várias instâncias ao recarregar o código.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
