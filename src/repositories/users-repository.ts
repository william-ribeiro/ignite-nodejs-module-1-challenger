import { randomUUID } from 'crypto'
import { knex } from '../database'
import { CreateUserType, UpdateUserType } from '../utils/schemas/user-schema'
import { User } from '../entities/user'

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  create(data: CreateUserType): Promise<void>
  update(id: string, data: UpdateUserType): Promise<void>
  delete(id: string): Promise<void>
}

export class UserRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return knex('users').where({ email }).first()
  }

  async findById(id: string): Promise<User | undefined> {
    return knex('users').where({ id }).first()
  }

  async update(
    id: string,
    { name, email, age, password, sessionId }: UpdateUserType,
  ): Promise<void> {
    await knex('users').where({ id }).update({
      name,
      email,
      age,
      password,
      updated_at: new Date().toISOString(),
      session_id: sessionId,
    })
  }

  async create({ name, age, email, password }: CreateUserType): Promise<void> {
    await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        age,
        password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        session_id: randomUUID(),
      })
      .returning('*')
  }

  async delete(id: string): Promise<void> {
    await knex('users').where({ id }).delete()
  }
}
