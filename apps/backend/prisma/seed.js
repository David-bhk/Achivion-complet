import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Change these passwords to your desired secure passwords
  const superuserPassword = 'SuperStrongPass123!'
  const adminPassword = 'AdminStrongPass456!'

  const hashedSuperuserPassword = await bcrypt.hash(superuserPassword, 10)
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

  // Upsert SUPERUSER
  const superuser = await prisma.user.upsert({
    where: { email: 'superuser@example.com' },
    update: {},
    create: {
      email: 'superuser@example.com',
      name: 'Super User',
      password: hashedSuperuserPassword,
      role: 'SUPERUSER',
    },
  })

  // Upsert ADMIN
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Seeded Superuser and Admin users successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
