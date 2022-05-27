import fs from 'fs';	
import { exec } from 'child_process'
const backscript: string = "./back.py";

const fileContent = fs.readFileSync(backscript, "utf8");

class ScriptsHandler {
    public static execute(path: string): void {
        exec(`python ${path}`, function (error, stdOut, stdErr) {
            console.log(stdOut);
        });
    }
}


