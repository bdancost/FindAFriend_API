import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository.js'
import { GetPetUseCase } from '@/use-cases/get-pet.use-case.js'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}
