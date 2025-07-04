import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function canDeleteFile(request, reply) {
  const { id } = request.params
  const user = request.user

  if (user.role === 'ADMIN' || user.role === 'SUPERUSER') {
    return // allow
  }

  const file = await prisma.file.findUnique({
    where: { id: parseInt(id) }
  })

  if (!file) {
    return reply.code(404).send({ error: 'File not found' })
  }

  if (file.userId !== user.id) {
    return reply.code(403).send({ error: 'Forbidden: you can only delete your own files' })
  }

  // If no error, just return and Fastify proceeds to route handler
}
