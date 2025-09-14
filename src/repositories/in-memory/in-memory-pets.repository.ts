import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository.js'
import type { FindAllParams, PetsRepository } from '@/repositories/pets.repository.js'
import type { Pet, Prisma } from '@prisma/client'
import crypto from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  private orgsRepository: InMemoryOrgsRepository

  constructor(orgsRepository?: InMemoryOrgsRepository) {
    this.orgsRepository = orgsRepository ?? new InMemoryOrgsRepository()
    // 👆 se não passar nada, ele cria um novo InMemoryOrgsRepository por padrão
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter((org) => org.city === params.city)

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.energy_level ? item.energy_level === params.energy_level : true))
      .filter((item) => (params.environment ? item.environment === params.environment : true))

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }
}
