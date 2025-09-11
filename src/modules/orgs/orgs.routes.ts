// src/modules/orgs/orgs.routes.ts
import type { FastifyInstance } from 'fastify'
import { OrgsController } from './orgs-controller.js'

//Rota  →  Controller  →  Service  →  Repository  →  Prisma

export async function orgRoutes(app: FastifyInstance) {
  // Cadastro de ORG
  app.post('/orgs', OrgsController.register)

  // Login de ORG
  app.post('/orgs/login', OrgsController.login)
}
