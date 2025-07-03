import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function uploadFile(request, reply) {
  const parts = request.parts()
  const user = request.user // from JWT

  for await (const part of parts) {
    if (part.file) {
      const uploadDir = path.join(process.cwd(), 'uploads')
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

      const filePath = path.join(uploadDir, part.filename)
      const writeStream = fs.createWriteStream(filePath)
      await part.file.pipe(writeStream)

      const stats = fs.statSync(filePath)

      // Save file metadata to DB
      const saved = await prisma.file.create({
        data: {
          filename: part.filename,
          mimetype: part.mimetype,
          size: stats.size,
          path: filePath,
          userId: user.id
        }
      })

      return reply.send({ message: 'File uploaded', file: saved })
    }
  }

  reply.code(400).send({ error: 'No file uploaded' })
}
