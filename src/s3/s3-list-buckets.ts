
// Returns a list of Spaces in your region.
import {ListBucketsCommand} from "@aws-sdk/client-s3";
import {s3Client} from "./s3-client-init";

export const listBuckets = async () => {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        console.log("Success. data.Buckets: ", data.Buckets);
        return data.Buckets; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};
