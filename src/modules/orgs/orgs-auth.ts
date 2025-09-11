// src/modules/orgs/orgs.auth.ts
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function registerAuth(app: FastifyInstance) {
  // Função que valida JWT
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send({ message: 'Token inválido' })
    }
  })
}
