import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateUserRole(request, reply) {
  const currentUser = request.user
  const { id } = request.params
  const { role } = request.body

  // Validate roles allowed
  const allowedRoles = ['USER', 'ADMIN', 'SUPERUSER']
  if (!allowedRoles.includes(role)) {
    return reply.code(400).send({ error: 'Invalid role' })
  }

  // Only ADMIN or SUPERUSER can change roles
  if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Access denied' })
  }

  // Cannot demote/promote self for safety
  if (currentUser.id === parseInt(id)) {
    return reply.code(400).send({ error: 'Cannot change your own role' })
  }

  // Check if user exists
  const userToUpdate = await prisma.user.findUnique({ where: { id: parseInt(id) } })
  if (!userToUpdate) {
    return reply.code(404).send({ error: 'User not found' })
  }

  // Update role
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  return reply.send(updatedUser)
}
