import type { PetsRepository } from '@/repositories/pets.repository.js'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error.js'
import type { Pet } from '@prisma/client'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
