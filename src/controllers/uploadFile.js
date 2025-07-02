import fs from 'fs'
import path from 'path'

export async function uploadFile(request, reply) {
  const parts = request.parts()

  for await (const part of parts) {
    if (part.file) {
      // Prepare folder
      const uploadDir = path.join(process.cwd(), 'uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
      }

      // Save the file
      const filePath = path.join(uploadDir, part.filename)
      const writeStream = fs.createWriteStream(filePath)
      await part.file.pipe(writeStream)

      reply.send({ message: 'File uploaded', filename: part.filename })
      return
    }
  }

  reply.code(400).send({ error: 'No file uploaded' })
}
