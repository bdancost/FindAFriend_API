import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository.js'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org.use-case.js'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}
