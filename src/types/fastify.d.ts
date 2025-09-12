// src/types/fastify.d.ts
import '@fastify/jwt'
import 'fastify'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    use: { sub: string }
  }
}
