import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json(await fetch('https://family-lutz.de/exercises.json', { cache: 'no-store' }).then((res) => res.json()));
}