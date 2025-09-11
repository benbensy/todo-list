import { PrismaClient } from '../src/database/generated/prisma'
import { PasswordService } from '../src/services/password.service'

const prisma = new PrismaClient()
const passwordService = new PasswordService()

async function main() {
  const salt = passwordService.generateSalt()
  const hashedPassword = await passwordService.hashPassword('admin', salt)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      nickname: 'admin',
      password: hashedPassword,
    },
  })

  const priorities = [
    { weight: 3, name: 'High', highlight_color: '#FF4D4F' },
    { weight: 2, name: 'Medium', highlight_color: '#FAAD14' },
    { weight: 1, name: 'Low', highlight_color: '#52C41A' },
  ]

  for (const p of priorities) {
    await prisma.priority.upsert({
      where: { user_id_name: { user_id: admin.id, name: p.name } },
      update: {},
      create: { ...p, user_id: admin.id },
    })
  }

  console.log('Seed finished.')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
