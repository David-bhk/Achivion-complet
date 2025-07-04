import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export async function downloadFile(request, reply) {
  const { id } = request.params
  const user = request.user

  const file = await prisma.file.findUnique({
    where: { id: parseInt(id) }
  })

  if (!file) {
    return reply.code(404).send({ error: 'File not found' })
  }

  if (file.userId !== user.id) {
    return reply.code(403).send({ error: 'Access denied' })
  }

  const uploadDir = path.join(process.cwd(), 'uploads')
  const filePath = path.join(uploadDir, path.basename(file.filename))

  if (!fs.existsSync(filePath)) {
    return reply.code(410).send({ error: 'File missing from storage' })
  }

  return reply
    .header('Content-Disposition', `attachment; filename="${file.filename}"`)
    .send(fs.createReadStream(filePath))
}
