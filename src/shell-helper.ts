const shell = require('shelljs');

export function execCommand(cmd: string) {
    console.log("★ Command: ", cmd);
    shell.exec(cmd);
    if (shell.error()) {
        console.error("✘ Aborting!\n", shell.error());
        process.exit();
    }
}

