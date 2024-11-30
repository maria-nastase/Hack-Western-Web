import { NextResponse } from "next/server";

export async function GET(_req) {
    return NextResponse.json({ test: "hello"})
}

export async function POST(_req) {
    return NextResponse.json({ test: "posted"})
}