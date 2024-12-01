import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'))
    const user = await prisma.fall.findMany({
        where: {
          userId: id,
        },
      }
    )

    return Response.json(user)
}