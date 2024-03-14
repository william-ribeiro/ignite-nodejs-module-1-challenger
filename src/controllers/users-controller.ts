import { compare, hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

import {
  CreateUserType,
  SignInType,
  UpdateUserType,
} from '../utils/schemas/user-schema'
import { UserRepository } from '../repositories/users-repository'
import { User } from '../entities/user'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'
import { UnauthorizedError } from '../errors/unauthorized.error'
import { NotFoundError } from '../errors/not-found.error'

const userRepository = new UserRepository()

export async function signInController({
  email,
  password,
}: SignInType): Promise<string> {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw new UnauthorizedError()
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedError()
  }

  const sessionId = randomUUID()

  await userRepository.update(user.id, { ...user, sessionId })

  return sessionId
}

export async function createUserController({
  name,
  email,
  age,
  password,
}: CreateUserType) {
  const user = await userRepository.findByEmail(email)

  if (user) {
    throw new UserAlreadyExistsError()
  }

  const passwordHash = await hash(password, 8)

  await userRepository.create({ name, email, age, password: passwordHash })
}

export async function updateUserController({
  id,
  name,
  email,
  age,
  password,
}: UpdateUserType) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw new NotFoundError()
  }

  if (user && user.id !== id) {
    throw new UserAlreadyExistsError()
  }

  const updateUser = {
    name: name ?? user?.name,
    email: email ?? user?.email,
    age: age ?? user?.age,
    password: password ? await hash(password, 8) : user?.password,
  } as User

  await userRepository.update(id, { ...updateUser })
}

export async function deleteUserController(id: string) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw new NotFoundError()
  }

  await userRepository.delete(id)
}
