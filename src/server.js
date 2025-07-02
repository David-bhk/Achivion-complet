import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import jwt from '@fastify/jwt'
import protectedRoutes from './routes/protectedRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const app = Fastify({ logger: true })

app.register(cors)
app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey' //replace with your own secret
})

app.get('/', async (request, reply) => {
  return { message: 'Archivio backend fonctionne 🎉' }
})

//decorate request with auth verification
app.decorate('authenticate', async function (request, reply){
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.code(401).send({
            error: 'Unauthorized access'
        })}
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
app.register(uploadRoutes) // Register the upload routes
app.register(multipart)
app.register(protectedRoutes)
app.register(authRoutes)
start()

