// Returns a list of Spaces in your region.
import {s3Client} from "./s3-client-init";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {ReadStream} from "fs";

export const uploadToBucket = async (bucketName: string, remoteFilepath: string, body: ReadStream) => {

    // Specifies a path within your bucket and the file to upload.
    const bucketParams = {
        Bucket: bucketName,
        Key: remoteFilepath,
        Body: body
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log(
            "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
        return data;
    } catch (err) {
        console.log("Error", err);
    }

};

