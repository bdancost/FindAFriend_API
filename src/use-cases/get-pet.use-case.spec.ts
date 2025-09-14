import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository.js'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error.js'
import { GetPetUseCase } from '@/use-cases/get-pet.use-case.js'
import { makePet } from '@tests/factories/make-pet.factory.js'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
