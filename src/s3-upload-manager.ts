import * as path from "path";
import {uploadToBucket} from "./s3/s3-upload-to-bucket";
import fs from "fs";

interface UploadUsingStreamToSpaceParams {
    dumpConfig: BackupConfig
    bucketName: string
    bucketDirName: string
}

export async function uploadUsingStreamToSpace({
                                                   dumpConfig,
                                                   bucketName,
                                                   bucketDirName
                                               }: UploadUsingStreamToSpaceParams) {

    console.log("★ Going to upload to space");

    const myKey = path.join(bucketDirName, dumpConfig.gzipName);

    //Allows for big file to be upload thanks to stream otherwise, it crashes (> 2GB)
    const localTarget = path.join(dumpConfig.dumpPath, dumpConfig.gzipName);
    const body = fs.createReadStream(localTarget);

    await uploadToBucket(bucketName, myKey, body);

    console.log(`★ Successfully uploaded data to bucket: ${bucketName} under the following key: ${myKey}`);

    return true;
}
