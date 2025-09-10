import Fastify from 'fastify'
import cors from '@fastify/cors'

export const app = Fastify()

app.register(cors, {
  origin: true, // libera todos os domínios (em produção, restrinja!)
})

app.get('/health', async () => {
  return { status: 'ok' }
})
