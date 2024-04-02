import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json(await fetch('https://family-lutz.de/exercises.json').then((res) => res.json()));
}