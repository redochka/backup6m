const s3Speaker = require('../src/s3-speaker');

test('Test upload using fs stream', done => {

    function callback(data){
        try {
            done();
        } catch (error) {
            done(error);
        }
    }

    process.env.BUCKET_DIR_NAME="testdell"

    const dumpInfo = {
        "gzipName" : "cron.log",
        "dumpName" : "avoid ts warning"
    }
    s3Speaker.uploadUsingStreamToSpace({dumpInfo : dumpInfo, onComplete : done});
});
