import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export async function uploadFile(request, reply) {
  const parts = request.parts()
  const user = request.user
  

  const uploadDir = path.join(process.cwd(), 'uploads')

  // ✅ Ensure uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  for await (const part of parts) {
    if (part.file) {
      const filePath = path.join(uploadDir, part.filename)

      const writeStream = fs.createWriteStream(filePath)
      await part.file.pipe(writeStream)

      await new Promise((resolve) => writeStream.on('finish', resolve))

      const { size } = await fs.promises.stat(filePath)
      // Save file metadata to DB
      await prisma.file.create({
        data: {
          filename: part.filename,
          mimetype: part.mimetype,
          path: filePath,
          size,
          userId: user.id,
        }
      })
    }
  }

  return reply.code(201).send({ message: 'File uploaded successfully' })
}
