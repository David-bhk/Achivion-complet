import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function registerUser(req, res) {
    const {name, email, password} = req.body

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
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    reply.code(201).send({
        message: 'User created successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}