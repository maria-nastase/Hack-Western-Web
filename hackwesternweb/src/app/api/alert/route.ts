import { NextResponse } from "next/server";
import dotenv from 'dotenv'

dotenv.config()

export async function GET(_req) {
    return NextResponse.json({ test: "hello"})
}



const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



export async function POST(req) {
    const test = req.body.hello

    client.messages
    .create({
        body: 'test message',
        from: process.env.FROM_NUMBER,
        to: process.env.TO_NUMBER
    })
    .then(message => console.log(message.sid));

    return NextResponse.json({ok: true})
}
