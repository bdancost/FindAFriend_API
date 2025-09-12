// src/modules/orgs/orgs.protected.routes.ts
import type { FastifyInstance } from 'fastify'
import { OrgsController } from './orgs-controller.js'

export async function orgProtectedRoutes(app: FastifyInstance) {
  // Rota protegida: retorna dados da ORG logada
  app.get(
    '/orgs/me',
    {
      preHandler: [app.use], // valida JWT antes de entrar no controller
    },
    OrgsController.me
  )
}
