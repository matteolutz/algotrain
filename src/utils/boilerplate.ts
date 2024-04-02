import AlgoTrainExercise from "@/models/exercise";

const getExerciseBoilerplate = (exercise: AlgoTrainExercise): string => {
    return `class Solution {
    public static ${exercise.implementation.solutionMethodReturnType} ${exercise.implementation.solutionMethodName}(${exercise.implementation.solutionMethodParams.map(param => `${param.type} ${param.name}`).join(", ")}) {
        // Beginne bitte hier mit deiner Implementierung
    }
}
`
};

export default getExerciseBoilerplate;