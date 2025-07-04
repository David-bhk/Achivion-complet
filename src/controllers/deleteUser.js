import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteUser(request, reply) {
  const currentUser = request.user
  const { id } = request.params

  if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Access denied' })
  }

  if (currentUser.id === parseInt(id)) {
    return reply.code(400).send({ error: 'You cannot delete your own account' })
  }

  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
  if (!user) {
    return reply.code(404).send({ error: 'User not found' })
  }

  await prisma.user.delete({ where: { id: parseInt(id) } })

  return reply.send({ message: `User ${user.email} deleted successfully` })
}
