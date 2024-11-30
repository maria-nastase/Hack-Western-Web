import { NextResponse } from "next/server";
import dotenv from 'dotenv'

dotenv.config()

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function GET(_req) {
    return NextResponse.json({ test: "hello"})
}

export async function POST(req) {
    const { fname, lname, number, severity, latitude, longitude } =  req.json();

    const locationLink = encodeURI('https://www.google.com/maps/place/43.006841,-81.2769333')
    
    client.messages
    .create({
        body: `Hello, we have detected that ${fname} ${lname} has had a ${severity} fall. Please check in with them at the following location: ${locationLink}.`,
        from: process.env.FROM_NUMBER,
        to: process.env.TO_NUMBER
    })
    .then(message => console.log(message.sid));

    return NextResponse.json({ok: true})
}
