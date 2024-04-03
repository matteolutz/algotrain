type AlgoTrainExercise = {
    id: number;
    name: string;
    description: string;
    implementation: {
        solutionMethodName: string;
        solutionMethodParams: Array<{ type: string, name: string }>;
        solutionMethodReturnType: string;
    },
    testCases: Array<{
        input: Array<string>,
        assertions: Array<string>,
    }>;
    prequelCode?: string;
};

export default AlgoTrainExercise;
