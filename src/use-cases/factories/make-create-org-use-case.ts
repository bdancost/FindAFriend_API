import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository.js'
import { CreateOrgUseCase } from '@/use-cases/create-org.use-case.js'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
