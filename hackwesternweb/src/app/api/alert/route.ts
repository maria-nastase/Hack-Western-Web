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
        from: '+17754587628',
        to: '+12262800252'
    })
    .then(message => console.log(message.sid));

    return NextResponse.json({ok: true})
}
