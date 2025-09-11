import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env/index.js'

// Importando rotas e autenticação
import { orgRoutes } from './modules/orgs/orgs.routes.js'
import { orgProtectedRoutes } from './modules/orgs/orgs-protected-routes.js'
import { registerAuth } from './modules/orgs/orgs-auth.js'

export const app = Fastify()

// Configurações do Fastify
app.register(cors, {
  origin: true, // libera todos os domínios (em produção, restrinja!)
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: {
    expiresIn: '2h',
  },
})

app.register(fastifyCookie)

// Rota de health check
app.get('/health', async () => {
  return { status: 'ok' }
})

// 🔹 Registrar autenticação JWT
await registerAuth(app)

// 🔹 Registrar rotas públicas
await orgRoutes(app)

// 🔹 Registrar rotas protegidas
await orgProtectedRoutes(app)
