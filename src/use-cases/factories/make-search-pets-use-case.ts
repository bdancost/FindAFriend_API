import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository.js'
import { SearchPetsUseCase } from '@/use-cases/search-pets.use-case.js'

export function makeSearchPetsUseCase() {
  return new SearchPetsUseCase(new PrismaPetsRepository())
}
