'use client';

import Link from "next/link";
import AlgoTrainExercise from "@/models/exercise";
import useSWR from "swr";

export default function Home() {

  const {data: exercises} = useSWR<Array<AlgoTrainExercise>>(`${process.env.NEXT_PUBLIC_API_URL}/exercises`, async (url: string) => {
        const res = await fetch(url);
        return res.json();
    });

  if (!exercises) return <div>Loading...</div>;

    console.log(exercises);

  return (
      <div className="size-full p-5">
          <div className="w-full h-full">
              <h2 className="text-2xl font-bold">Aufgaben</h2>
              <ul className="list-disc ml-5">
                  {exercises.map(exercise => (
                      <li key={exercise.id}>
                          <Link href={`/train/${exercise.id}`}>{exercise.name}</Link>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
}