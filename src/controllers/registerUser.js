import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function registerUser(request, reply) {
    const {name, email, password} = request.body

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        return reply.code(400).send({
            error: 'User already exists'})
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the new user to the database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return reply.code(201).send({
        message: 'User created',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}