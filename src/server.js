import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import dotenv from 'dotenv'

dotenv.config()

const app = Fastify({ logger: true })

app.register(cors)
app.register(multipart)

app.get('/', async (request, reply) => {
  return { message: 'Archivio backend fonctionne 🎉' }
})

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
    console.log('Serveur lancé sur http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
