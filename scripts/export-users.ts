import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Fetching all users...')
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      college: true,
      studentId: true,
      department: true,
      address: true,
      role: true,
      createdAt: true,
      isOnboarded: true,
      needsAccommodation: true,
      registrations: {
        select: {
          event: {
            select: {
              title: true
            }
          }
        }
      }
    }
  })

  const count = users.length
  console.log(`Found ${count} users.`)

  const data = JSON.stringify(users, null, 2)
  const fileName = `users_onboarding_data_${new Date().toISOString().replace(/:/g, '-')}.json`
  const filePath = path.join(process.cwd(), fileName)

  fs.writeFileSync(filePath, data)
  console.log(`Successfully exported data to ${fileName}`)

  // Also output to console just in case they want to copy it
  console.log('--- DATA START ---')
  console.log(data)
  console.log('--- DATA END ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
