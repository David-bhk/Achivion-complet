import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export async function deleteFile(request, reply) {
  const { id } = request.params
  const user = request.user

  const file = await prisma.file.findUnique({
    where: { id: parseInt(id) }
  })

  if (!file) {
    return reply.code(404).send({ error: 'File not found' })
  }

  // Check if the user owns the file (we’ll add admin check later)
  if (file.userId !== user.id) {
    return reply.code(403).send({ error: 'Not authorized to delete this file' })
  }

  // Delete file from disk
  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path)
  }

  // Delete metadata from DB
  await prisma.file.delete({
    where: { id: file.id }
  })

  return reply.send({ message: 'File deleted successfully' })
}
