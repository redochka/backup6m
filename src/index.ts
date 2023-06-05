import {B6MConfig} from "./types/B6MConfig";
import moment from "moment";
import * as ConfigLoader from "./config-loader"
import {dbBackup} from "./dump-helper";
import {gzip} from "./gzip-helper";
import {uploadUsingStreamToSpace} from "./s3-upload-manager";
import {uploadByScp} from "./scp-manager";
import shell from "shelljs";
import path from "path";

// override console.log
import fs from "fs";

import yaml from "js-yaml";

// require('log-timestamp')(function() { return `${new Date().toISOString()} %s` });
// import log_timestamp from "log-timestamp";
// log_timestamp(function() { return `${new Date().toISOString()} %s` });


const configurationFiles = ConfigLoader.loadConfigurationFiles();

const date = moment().format("YYYY_MM_DD\TH_mm_ss");

const buildBackupConfig = function (dbName: string): BackupConfig {
    const name = "dump_" + dbName + "_" + date;
    return {
        "dumpName": `${name}.sql`,
        "gzipName": `${name}.sql.gz`,
        "dumpPath": '/tmp'
    }
}

/**
 *
 */
for (const configurationFile of configurationFiles) {
    try {
        let fileContents = fs.readFileSync(configurationFile, 'utf8');
        let configuration = yaml.load(fileContents) as B6MConfig;
        console.log(configuration);

        if (configuration.skipRun) {
            console.log("★ skipRun is true. Aborting!");
            continue;
        }

        let backupConfig = buildBackupConfig(configuration.databaseConfig.dbName);

        console.log("★ Calling dbBackup");
        dbBackup({
            databaseConfig: configuration.databaseConfig,
            dumpInfo: backupConfig
        });

        console.log("★ Calling gzip on: ", backupConfig);
        gzip(backupConfig);

        console.log("★ Calling uploadUsingStreamToSpace");
        const result1 = await uploadUsingStreamToSpace({
            dumpConfig: backupConfig,
            bucketName: configuration.bucketName,
            bucketDirName: configuration.bucketDirName,
        })

        const result2 = uploadByScp(backupConfig, configuration.bucketName, configuration.bucketDirName);

        if (result1 || result2) {
            console.log("★ Going to delete the gzip");
            const localTarget = path.join(backupConfig.dumpPath, backupConfig.gzipName);
            shell.rm('-rf', localTarget);
        }

    } catch (e) {
        console.log(e);
    }

}
