import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserFiles(request, reply) {
  const user = request.user

  const files = await prisma.file.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      uploadedAt: 'desc'
    }
  })

  return reply.send({ files })
}
