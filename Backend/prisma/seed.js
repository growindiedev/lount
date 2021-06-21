const {users, messages} = require('./seedData')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')


const prisma = new PrismaClient();

async function main() {
    for (let user of users) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: passwordHash,
                imageUrl: user.imageUrl
            }
        })
    }

    for (let msg of messages) {
        await prisma.message.create({
            data: {
                from: msg.from,
                to: msg.to,
                content: msg.content
            }
        })
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => prisma.$disconnect())