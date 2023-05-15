//const aws    = require('aws-sdk');
import * as aws from "aws-sdk";
import * as path from "path";

const shell = require('shelljs');
const fs = require('fs');
require('log-timestamp');

interface UploadUsingStreamToSpaceParams {
  dumpConfig: B6MDump
  bucketName: string
  bucketDirName: string
  s3ConfigFilePath?: string
  onComplete?: CallableFunction
}

// const myBucket = 'mybackup';

/**
 * S3 doesn't have folders. It is just a prefix.
 * It shows you the folder structure to make it easy for you to navigate and see files.
 * @param bucketDirName
 */
function getPrefixInsideBucket(bucketDirName: string) {
  return bucketDirName + "/dumps/";
}


export function uploadUsingStreamToSpace({dumpConfig, bucketName, bucketDirName, onComplete}: UploadUsingStreamToSpaceParams) {

  console.log("★ Going to upload to space");

  // Set S3 endpoint to DigitalOcean Spaces
  const spacesEndpoint = new aws.Endpoint('ams3.digitaloceanspaces.com');
  const s3 = new aws.S3({
    // @ts-ignore
    "endpoint": spacesEndpoint
  });
  aws.config.loadFromPath('./mount/credentials/s3-config.json');
  // s3.config.loadFromPath('./mount/s3-config.json');

  let prefix = getPrefixInsideBucket(bucketDirName);
  const myKey = prefix + dumpConfig.gzipName;

  //Allows for big file to be upload thanks to stream otherwise, it crashes (> 2GB)
  const target = path.join(dumpConfig.dumpPath, dumpConfig.gzipName);
  var body = fs.createReadStream(target);

  const params = {Bucket: bucketName, Key: myKey, Body: body};
  s3.upload(params, function (err: any, data: any) {
    if (err) {
      console.log(err)
    } else {
      console.log(`★ Successfully uploaded data to ${bucketName}/${myKey}`);
      console.log("★ Going to delete the gzip");
      shell.rm('-rf', target);
    }

        if (typeof onComplete !== 'undefined') {
            onComplete();
        }
    });
}
