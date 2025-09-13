import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'

import { createPetController } from '@/http/controllers/pets/create-pet.controller.js'
import { getPetController } from '@/http/controllers/pets/get-pet.controller.js'
import { searchPetsController } from '@/http/controllers/pets/search-pets.controller.js'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetController)
  app.get('/orgs/pets', searchPetsController)
  app.get('/orgs/pets/:id', getPetController)
}
