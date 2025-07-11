import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function listFiles(request, reply) {
  const user = request.user

  let files

  if (user.role === 'ADMIN' || user.role === 'SUPERUSER') {
    // Return all files
    files = await prisma.file.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  } else {
    // Return only own files
    files = await prisma.file.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
  }

  return reply.send(files)
}
