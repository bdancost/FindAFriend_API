import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository.js'
import { FetchNearbyOrgsUseCase } from '@/use-cases/fetch-nearby-orgs.use-case.js'

export function makeFetchNearbyUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository())
}
