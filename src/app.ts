import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env/index.js'
import { ZodError } from 'zod'

export const app = Fastify()

app.register(cors, {
  origin: true, // libera todos os domínios (em produção, restrinja!)
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false }, // substitua por variável de ambiente
  sign: {
    expiresIn: '2h', // tokens expiram em 24 horas
  },
})

app.register(fastifyCookie)

app.get('/health', async () => {
  return { status: 'ok' }
})
