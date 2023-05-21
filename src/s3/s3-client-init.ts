import {S3} from "@aws-sdk/client-s3";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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
        // accessKeyId: "DO008HWBAPDU4YN8MZ6G",
        // secretAccessKey: "FvACP8ZYnSpEQCipAG3/vBrPkbg6h5OlA2CsSor9kHA"
    }
    // not working, bug issue created on aws
    /*    credentials: fromIni({
        // filepath: '/home/reda/dev/js/backup6m/mount/credentials/s3-credentials.ini',
        filepath: '/home/reda/dev/js/backup6m/mount/credentials/credentials.ini',
        // filepath: './mount/credentials/credentials.ini',
        // configFilepath: './',
        // filepath: './credentials.ini',
        profile: 'test',
    }),*/
});


export {s3Client};


