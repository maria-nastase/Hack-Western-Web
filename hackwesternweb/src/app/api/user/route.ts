import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'))
    const user = await prisma.user.findUnique({
        where: {
          id,
        },
      }
    )

    return Response.json(user)
}

export async function POST(req: Request) {
    const { fname, lname, number, email } = await req.json()

    let user: Prisma.UserCreateInput =  {
        email: email,
        fname: fname,
        lname: lname,
        number: number
    }
    const createUser = await prisma.user.create({ data: user })

    return Response.json(createUser)
}