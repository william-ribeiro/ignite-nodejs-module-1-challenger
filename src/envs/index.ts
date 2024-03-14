import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
}

config({ path: '.env' })

const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production', 'local']),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  PORT: z.coerce.number().default(4452),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environemnt variables!', _env.error.format())
  throw new Error('Invalid environemnt variables!')
}

export const env = _env.data
