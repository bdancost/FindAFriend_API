// src/types/fastify.d.ts
import '@fastify/jwt'
import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>
  }
}
