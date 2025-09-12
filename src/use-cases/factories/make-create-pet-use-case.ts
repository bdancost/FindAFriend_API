import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository.js'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository.js'
import { CreatePetUseCase } from '@/use-cases/create-pet.use-case.js'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(new PrismaOrgsRepository(), new PrismaPetsRepository())
}
