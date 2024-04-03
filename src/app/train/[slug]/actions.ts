'use server';

import AlgoTrainExercise from "@/models/exercise";
import * as fs from "fs";
import path from "path";
import exec from "@/utils/exec";

export type RunCodeActionState = {
    success: 'pending' | 'success' | 'error';
    output: string;
}

export async function runCode(exercise: AlgoTrainExercise, prevState: any, formData: FormData) {
    const code = `import java.util.*;
    
${exercise.prequelCode ?? ''}
    
public class Main {
    
    ${exercise.testCases.map((testCase, index) => `private static void testCase${index + 1}() throws Exception {
${testCase.input.map((input, index) => `    ${exercise.implementation.solutionMethodParams[index].type} input${index + 1} = ${input};`).join('\n')}
${(exercise.implementation.solutionMethodReturnType !== 'void' ? `${exercise.implementation.solutionMethodReturnType} result = ` : '') + `Solution.${exercise.implementation.solutionMethodName}(${exercise.implementation.solutionMethodParams.map((_param, index) => `input${index + 1}`).join(', ')});`}

    ${testCase.assertions.map((assertion, assertionIdx) => `    if(!(${assertion})){
            throw new Exception("Test ${index+1} nicht bestanden! Bedingung ${assertionIdx + 1} nicht erfüllt!");
        }`).join('\n')}
    }
`).join('\n')} 
    
    public static void main(String []args) throws Exception {
        ${exercise.testCases.map((_, index) => `testCase${index + 1}();`).join('\n')}  
        System.out.println("Alle Tests bestanden");
    }
}
${formData.get('code')}`;

    const name = Math.random().toString(36).substring(7);

    const genPath = path.join(process.cwd(), 'gen');
    if(!fs.existsSync(genPath)) await fs.promises.mkdir(genPath);

    const rootPath = path.join(genPath, name);
    await fs.promises.mkdir(rootPath);
    await fs.promises.writeFile(path.join(rootPath, `Main.java`), code);

    try {
        const compilation = await exec(`javac Main.java`, { cwd: rootPath });
    } catch(e) {
        await fs.promises.rm(rootPath, { recursive: true, force: true });
        return {
            success: 'error',
            output: 'Fehler beim Kompilieren: ' + e
        } satisfies RunCodeActionState;
    }

    let execution;
    try {
        execution = await exec(`java Main`, { cwd: rootPath });
    } catch (e) {
        await fs.promises.rm(rootPath, { recursive: true, force: true });
        return {
            success: 'error',
            output: 'Fehler beim Ausführen: ' + e
        } satisfies RunCodeActionState;
    }

    await fs.promises.rm(rootPath, { recursive: true, force: true });

    return {
        success: 'success',
        output: execution.stdout
    } satisfies RunCodeActionState;
}