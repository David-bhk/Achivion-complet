import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function loginUser(request, reply) {
  const { email, password } = request.body

  // 1. Find user by email
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return reply.code(404).send({ error: 'User not found' })
  }

  // 2. Compare passwords
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return reply.code(401).send({ error: 'Invalid credentials' })
  }

  // 3. Generate JWT token
  const token = await reply.jwtSign({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  })

  reply.send({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}
