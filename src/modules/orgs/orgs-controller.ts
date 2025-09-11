// src/modules/orgs/orgs.controller.ts
import type { FastifyReply, FastifyRequest } from 'fastify'
import { OrgsService } from './orgs-service.js'

const orgsService = new OrgsService()

export class OrgsController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, whatsapp, address, city } = request.body as any

      const org = await orgsService.register({
        name,
        email,
        password,
        whatsapp,
        address,
        city,
      })

      return reply.status(201).send({
        id: org.id,
        name: org.name,
        email: org.email,
      })
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }

  static async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as any

      const org = await orgsService.login(email, password)

      // Gera JWT (o secret foi configurado no server.ts)
      const token = (request.server as any).jwt.sign({ orgId: org.id })

      return reply.send({ token })
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }

  static async me(request: FastifyRequest, reply: FastifyReply) {
    try {
      // request.user vem do JWT verificado pelo preHandler
      const { orgId } = request.user as any

      // Busca a ORG no banco
      const org = await orgsService.getById(orgId)

      return reply.send({
        id: org.id,
        name: org.name,
        email: org.email,
        whatsapp: org.whatsapp,
        address: org.address,
        city: org.city,
      })
    } catch (error: any) {
      return reply.status(401).send({ message: 'Não autorizado' })
    }
  }
}
