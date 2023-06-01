import shell from "shelljs";

export function execCommand(cmd: string, exitOnError: boolean = true) {
    console.log("★ Command: ", cmd);
    shell.exec(cmd);
    if (shell.error()) {
        console.error("✘ Aborting!\n", shell.error());
        if (exitOnError) {
            process.exit();
        }
        return false;
    }
    return true;
}

