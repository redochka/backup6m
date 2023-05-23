import {execCommand} from "./shell-helper";
import * as path from 'path';

export function gzip(dumpConfig: BackupConfig) {

    let dest = path.join(dumpConfig.dumpPath, dumpConfig.dumpName);

    let cmd = `gzip ${dest}`;
    execCommand(cmd, true);
}
