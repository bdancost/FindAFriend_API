// src/modules/orgs/orgs.service.ts
import { OrgsRepository } from './orgs-repository.js'
import { hash, compare } from 'bcrypt'

export class OrgsService {
  private orgsRepository: OrgsRepository

  constructor() {
    this.orgsRepository = new OrgsRepository()
  }

  async getById(id: string) {
    const org = await this.orgsRepository.findById(id)
    if (!org) {
      throw new Error('ORG não encontrada')
    }
    return org
  }

  async register(data: {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    city: string
  }) {
    // Verifica se email já existe
    const orgExists = await this.orgsRepository.findByEmail(data.email)
    if (orgExists) {
      throw new Error('Email já cadastrado')
    }

    // Criptografa a senha
    const hashedPassword = await hash(data.password, 10)

    // Salva no banco via repository
    return this.orgsRepository.create({
      ...data,
      password: hashedPassword,
    })
  }

  async login(email: string, password: string) {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new Error('Credenciais inválidas')
    }

    const isValidPassword = await compare(password, org.password)
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas')
    }

    return org
  }
}
