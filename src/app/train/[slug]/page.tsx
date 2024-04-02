'use client'

import {Editor} from "@monaco-editor/react";
import useSWR from "swr";
import AlgoTrainExercise from "@/models/exercise";
import getExerciseBoilerplate from "@/utils/boilerplate";
import {runCode, RunCodeActionState} from "@/app/train/[slug]/actions";
import {useState} from "react";
import { useFormState } from 'react-dom'
import cn from "@/utils/cn";


function TrainPageComponent({ exercise }: { exercise: AlgoTrainExercise }) {
    const runExerciseCode = runCode.bind(null, exercise);
    const [code, setCode] = useState<string>(getExerciseBoilerplate(exercise));

    // @ts-ignore
    const [state, formAction] = useFormState(runExerciseCode, { success: 'pending', output: '' } satisfies RunCodeActionState);

    return <div className="size-full flex divide-x">
        <div className="w-[50%] h-full flex flex-col">
            <div className="p-5 w-full h-[75%] flex flex-col gap-4">
                <h2 className="text-xl">{exercise?.name}</h2>
                <div className="w-full" dangerouslySetInnerHTML={{ __html: exercise.description }}></div>
            </div>
            <div className="flex flex-col w-full h-[25%] bg-zinc-800 p-5">
                <h3>Ausgabe</h3>
                <div className="w-full h-full bg-black font-mono p-2 overflow-y-scroll" style={{ color: state.success === 'error' ? 'red' : 'white' }}>{state.output}</div>
            </div>
        </div>
        <form action={formAction} className="w-[50%] h-full flex flex-col">
            <Editor
                height="100%"
                language="java"
                theme="vs-dark"
                value={code}
                onChange={(value) => value && setCode(value)}
            />
            <input type="hidden" name="code" value={code} />
            <div className={cn("w-full h-[80px] shrink-0 flex p-4 overflow-hidden items-center", state.success === 'error' ? 'bg-red-900' : 'bg-emerald-900')}>
                <button type="submit" className="bg-green-500 px-4 py-2 rounded">Ausführen</button>
            </div>
        </form>
    </div>;
}

export default function TrainPage ({ params }: { params: { slug: string } }) {
    const { data: exercise } = useSWR<AlgoTrainExercise>(`${process.env.NEXT_PUBLIC_API_URL}/exercises/${params.slug}`, async (url: string) => {
        const res = await fetch(url);
        return res.json();
    });

    if (!exercise) {
        return <div>Loading...</div>;
    }

    return <TrainPageComponent exercise={exercise} />;
};