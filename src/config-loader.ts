import fs from "fs";
import path from "path";

export function loadConfigurationFiles() {
    const myPath = "./mount/b6m-config";
    const files = fs.readdirSync(myPath);
    return files.map((f: string) => path.join(myPath, f))
}
