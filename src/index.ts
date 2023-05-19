import {B6MConfig} from "./types/B6MConfig";

const fs = require('fs');
const yaml = require('js-yaml');
import moment from "moment";
import * as ConfigLoader from "./config-loader"
import {dbBackup} from "./dump-helper";
import {gzip} from "./gzip-helper";
import {uploadUsingStreamToSpace} from "./s3-speaker";

// override console.log
require('log-timestamp')(function() { return `${new Date().toISOString()} %s` });


const configurationFiles = ConfigLoader.loadConfigurationFiles();

const date = moment().format("YYYY_MM_DD\TH_mm_ss");

const buildDumpInfo = function (dbName: string): B6MDump {
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

        let dumpInfo = buildDumpInfo(configuration.databaseConfig.dbName);

        console.log("★ Calling dbBackup");
        dbBackup({
            databaseConfig: configuration.databaseConfig,
            dumpInfo
        });

        console.log("★ Calling gzip on: ", dumpInfo);
        gzip(dumpInfo);

        console.log("★ Calling uploadUsingStreamToSpace");
        uploadUsingStreamToSpace({
            dumpConfig: dumpInfo,
            bucketName: configuration.bucketName,
            bucketDirName: configuration.bucketDirName,
        });

    } catch (e) {
        console.log(e);
    }

}
