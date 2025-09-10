// src/modules/orgs/orgs.routes.ts
import type { FastifyInstance } from 'fastify'
import { hash } from 'bcrypt'
import { prisma } from '@/database/prisma.js'
import jwt from 'fastify-jwt'

export async function orgRoutes(app: FastifyInstance) {
  /**
   * Rota de cadastro de ORG
   * POST /orgs
   * Body esperado:
   * {
   *   name: string,
   *   email: string,
   *   password: string,
   *   whatsapp: string,
   *   address: string,
   *   city: string
   * }
   */
  app.post('/orgs', async (request, reply) => {
    const { name, email, password, whatsapp, address, city } = request.body as any

    // Verifica se email já existe
    const orgExists = await prisma.org.findUnique({ where: { email } })
    if (orgExists) {
      return reply.status(400).send({ message: 'Email já cadastrado' })
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10)

    // Cria a ORG no banco
    const org = await prisma.org.create({
      data: {
        name,
        email,
        password: hashedPassword,
        whatsapp,
        address,
        city,
      },
    })

    return reply.status(201).send({ id: org.id, name: org.name, email: org.email })
  })

  /**
   * Rota de login da ORG
   * POST /orgs/login
   * Body esperado:
   * {
   *   email: string,
   *   password: string
   * }
   */
  app.post('/orgs/login', async (request, reply) => {
    const { email, password } = request.body as any

    const org = await prisma.org.findUnique({ where: { email } })
    if (!org) {
      return reply.status(400).send({ message: 'Credenciais inválidas' })
    }

    // Compara senha
    const isValid = await import('bcrypt').then((b) => b.compare(password, org.password))
    if (!isValid) {
      return reply.status(400).send({ message: 'Credenciais inválidas' })
    }

    // Gera JWT
    const token = app.jwt.sign({ orgId: org.id })

    return reply.send({ token })
  })
}
