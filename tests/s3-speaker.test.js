const s3Speaker = require('../src/s3-upload-manager');
const {listBuckets} = require("../src/s3/s3-list-buckets");
const {uploadByScp} = require("../src/scp-manager");

test('Test upload using fs stream', async () => {

    process.env.BUCKET_DIR_NAME = "testdell"

    const dumpInfo = {
        "gzipName" : "cron.log",
        "dumpName" : "avoid ts warning"
    }
    s3Speaker.uploadUsingStreamToSpace({dumpInfo : dumpInfo, onComplete : done});
});

test('Test aws V3', done => {

    listBuckets().then(r => {
        // console.log(r);
        expect(r.length).toBeGreaterThan(0);
        done();
    });

});

test('Test upload to storage box (scp)', async () => {
    const dumpInfo = {
        "gzipName": "yarn.lock",
        "dumpPath": ".",
        "dumpName": "avoid ts warning"
    }

    const bucketName = "cazasouq-bucket";
    const bucketDirName = "dumps";

    await uploadByScp(dumpInfo, bucketName, bucketDirName);
});


test('Test download latest dump', done => {
    const dumpInfo = {
        "gzipName": "cron.log",
        "dumpName": "avoid ts warning"
    }
    s3Speaker.downloadLatestDump({
        dumpInfo: dumpInfo,
        bucketName: "mybackup",
        bucketDirName: "cazasouq",
        s3ConfigFilePath: "/home/reda/dev/js/backup6m-private/mount-caza/credentials/s3-config.json",
        onComplete: done
    })
})
