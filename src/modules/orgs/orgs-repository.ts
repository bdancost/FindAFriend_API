// src/modules/orgs/orgs.repository.ts
import { prisma } from '@/database/prisma.js'

export class OrgsRepository {
  async findByEmail(email: string) {
    return prisma.org.findUnique({
      where: { email },
    })
  }

  async findById(id: string) {
    return prisma.org.findUnique({ where: { id } })
  }

  async create(data: {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    city: string
  }) {
    return prisma.org.create({ data })
  }
}
