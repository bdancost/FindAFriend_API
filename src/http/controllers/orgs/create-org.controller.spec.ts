import request from 'supertest'

import { app } from '@/app.js'
import { makeOrg } from '@tests/factories/make-org.factory.js'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.status).toBe(201)
  })
})
