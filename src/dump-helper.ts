import {execCommand} from "./shell-helper";
import * as path from "path";
import {DatabaseConfig} from "./types/B6MConfig";

export function dbBackup({databaseConfig, dumpInfo}: { databaseConfig: DatabaseConfig, dumpInfo: B6MDump }) {

    let __pass__ = "";
    if (databaseConfig.password) {
        __pass__ = ` -p${databaseConfig.password} `;
    }

    //Example: /tmp/dump.sql
    const dest = path.join(dumpInfo.dumpPath, dumpInfo.dumpName);

    // const cmd = 'mysqldump -u ' + dbOptions.user + __pass__ + ' --skip-lock-tables ' + dbOptions.database + " > " + dumpInfo.dumpName;
    const cmd = `mysqldump -h ${databaseConfig.hostname} -u ${databaseConfig.username} ${__pass__} --skip-lock-tables ${databaseConfig.dbName} > ${dest}`;

    execCommand(cmd);
}
