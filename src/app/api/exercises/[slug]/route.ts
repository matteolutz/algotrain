import {NextRequest, NextResponse} from "next/server";
import AlgoTrainExercise from "@/models/exercise";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
    const exercises: Array<AlgoTrainExercise> = await fetch('https://family-lutz.de/exercises.json', { cache: 'no-store' }).then((res) => res.json());

    const exercise = exercises.find((exercise) => exercise.id === Number(params.slug));
    if (!exercise) {
        return new NextResponse('not found', { status: 404 })
    }

    return NextResponse.json(exercise);

}