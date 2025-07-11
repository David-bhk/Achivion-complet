import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function listUsers(request, reply) {
  const user = request.user

  if (user.role !== 'ADMIN' && user.role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Access denied: only admins can view users' })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reply.send(users)
}
