import {NextResponse} from "next/server";
import exercises from "@/data/exercises.json";

export async function GET() {
    return NextResponse.json(exercises);
}