import {S3} from "@aws-sdk/client-s3";

import * as dotenv from 'dotenv'

dotenv.config({
    path: "./mount/credentials/.env"
});

const accessKeyId = process.env.SPACES_KEY || "";
const secretAccessKey = process.env.SPACES_SECRET || "";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra1",
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
    // not working, bug issue created on aws: https://github.com/aws/aws-sdk-js-v3/issues/4740
/*    credentials: fromIni({
        // filepath: '/home/reda/dev/js/backup6m/mount/credentials/s3-credentials.ini',
        filepath: '/home/reda/dev/js/backup6m/mount/credentials/credentials.ini',
        profile: 'test'
    }),*/
});


export {s3Client};


