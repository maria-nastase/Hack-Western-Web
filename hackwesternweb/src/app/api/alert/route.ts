import { NextResponse } from "next/server";
import dotenv from 'dotenv'
import { PrismaClient, Prisma } from "@prisma/client";

dotenv.config()

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const prisma = new PrismaClient()

export async function GET() {
    return NextResponse.json({ test: "hello"})
}

export async function POST(req: any) {
    const hostUrl = req.headers.get('host');
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

    const fallenUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      }
    )

    if (!fallenUser) return new Response('', { status: 400 })
    
    // console.log(createFall.id);

    const locationLink = encodeURI(`${hostUrl}/?id=${createFall.id}`);
    console.log("locationlink", locationLink);
    
    client.messages
    .create({
        body: `Hello, we have detected that ${fallenUser.fname} ${fallenUser.lname} has had a ${severity} fall. Please check in with them at the following location: ${locationLink}.`,
        from: process.env.FROM_NUMBER,
        to: process.env.TO_NUMBER
    })
    .then((message: any) => console.log(message.sid));

    return Response.json(createFall)
}
