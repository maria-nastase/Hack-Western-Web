import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'))
    const user = await prisma.fall.findUnique({
        where: {
          id,
        },
      }
    )

    return Response.json(user)
}

export async function POST(req: Request) {
    const { latitude, longitude, severity, userId } = await req.json()

    let fall: Prisma.FallCreateInput =  {
        latitude: Number(latitude),
        longitude: Number(longitude),
        severity: severity,
        user: {
            connect:  {
                id: Number(userId)
            }
        }
    }
    const createFall = await prisma.fall.create({ data: fall })

    return Response.json(createFall)
}