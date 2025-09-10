import { PrismaClient } from '../src/database/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // -------------------------
  // 1. Priority
  // -------------------------
  const priorities = [
    { weight: 3, name: 'High', highlight_color: '#FF4D4F' },
    { weight: 2, name: 'Medium', highlight_color: '#FAAD14' },
    { weight: 1, name: 'Low', highlight_color: '#52C41A' },
  ]

  for (const p of priorities) {
    await prisma.priority.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    })
  }

  // -------------------------
  // 2. Dictionary (全局选项)
  // -------------------------
  const dictionaries = [
    { key: 'theme', code: 'LIGHT', value: '浅色', sort: 1 },
    { key: 'theme', code: 'DARK', value: '深色', sort: 2 },
    { key: 'priority_level', code: 'HIGH', value: '高', sort: 1 },
    { key: 'priority_level', code: 'MED', value: '中', sort: 2 },
    { key: 'priority_level', code: 'LOW', value: '低', sort: 3 },
  ]

  for (const d of dictionaries) {
    await prisma.dictionary.upsert({
      where: { key_code: { key: d.key, code: d.code } },
      update: {},
      create: d,
    })
  }

  // -------------------------
  // 3. User
  // -------------------------
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '123456', // 注意：实际生产请 hash
      preferences: {
        create: [
          { key: 'default_priority', value: 'MED' },
          { key: 'default_theme', value: 'LIGHT' },
        ],
      },
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
