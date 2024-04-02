import exercises from "@/data/exercises.json";
import {NextRequest, NextResponse} from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {

    const exercise = exercises.find(exercise => exercise.id === Number(params.slug));
    if (!exercise) {
        return new NextResponse('not found', { status: 404 })
    }

    return NextResponse.json(exercise);

}