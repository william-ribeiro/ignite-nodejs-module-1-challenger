// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'
import { User } from '../entities/user'

declare module 'knex/types/tables' {
  export interface Tables {
    users: User
  }
}
