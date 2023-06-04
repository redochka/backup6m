import {execCommand} from "./shell-helper";
import * as dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: "./mount/credentials/.env"
});

const hostname = process.env.HETZNER_HOSTNAME;
const username = process.env.HETZNER_USERNAME;
const password = process.env.HETZNER_PASSWORD;
const port = process.env.HETZNER_PORT || 22;

export const uploadByScp = function (dumpConfig: BackupConfig, bucketName: string, bucketDirName: string,) {

    const localTarget = path.join(dumpConfig.dumpPath, dumpConfig.gzipName);

    const remoteTarget = `${username}@${hostname}:${bucketName}/${bucketDirName}`

    const result = execCommand(`sshpass -p "${password}" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -P ${port} ${localTarget} ${remoteTarget}`, true);

    if (result) {
        console.log(`★ Successfully uploaded data ${remoteTarget}`);
    }

    return result;
};
