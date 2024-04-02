import Link from "next/link";
import AlgoTrainExercise from "@/models/exercise";

export default async function Home() {

  const exercises = await basicFetch<Array<AlgoTrainExercise>>(`${process.env.NEXT_PUBLIC_API_URL}/exercises`);

  return (
      <ul>
        {exercises.map(exercise => (
            <li key={exercise.id}>
              <Link href={`/train/${exercise.id}`}>{exercise.name}</Link>
            </li>
        ))}
      </ul>
  );
}