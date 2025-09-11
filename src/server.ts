// src/server.ts
import { app } from './app.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

async function startServer() {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' }) // host 0.0.0.0 permite acesso externo (ex: Docker)
    console.log('🚀HTTP Server Running!')
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err)
    process.exit(1) // encerra o processo caso haja erro
  }
}

startServer()
