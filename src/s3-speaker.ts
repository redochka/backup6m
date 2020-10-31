//const aws    = require('aws-sdk');
import * as aws from "aws-sdk";
import * as path from "path";

const shell = require('shelljs');
const fs = require('fs');

interface UploadUsingStreamToSpaceParams {
    dumpConfig: B6MDump;
    bucketDirName: string,
    onComplete?: CallableFunction
}

export function uploadUsingStreamToSpace({dumpConfig, bucketDirName, onComplete}: UploadUsingStreamToSpaceParams) {

    console.log("★ Going to upload to space");

    // Set S3 endpoint to DigitalOcean Spaces
    const spacesEndpoint = new aws.Endpoint('ams3.digitaloceanspaces.com');
    const s3 = new aws.S3({
        // @ts-ignore
        "endpoint": spacesEndpoint
    });
    aws.config.loadFromPath('./mount/credentials/s3-config.json');
    // s3.config.loadFromPath('./mount/s3-config.json');

    const myBucket = 'mybackup';
    const myKey = bucketDirName + "/dumps/" + dumpConfig.gzipName;

    //Allows for big file to be upload thanks to stream otherwise, it crashes (> 2GB)
    const target = path.join(dumpConfig.dumpPath, dumpConfig.gzipName);
    var body = fs.createReadStream(target);

    const params = {Bucket: myBucket, Key: myKey, Body: body};
    s3.upload(params, function (err: any, data: any) {
        if (err) {
            console.log(err)
        } else {
            console.log(`★ Successfully uploaded data to ${myBucket}/${myKey}`);
            console.log("★ Going to delete the gzip");
            shell.rm('-rf', target);
        }

        if (typeof onComplete !== 'undefined') {
            onComplete();
        }
    });
}
