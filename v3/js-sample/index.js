const client = require('@aws-sdk/client-s3');

const s3Client = new client.S3Client({region: 'us-west-2'});

const params = {
    Bucket: 'node-sample-bucket-ekwe',
    Key: 'ample_bosom.txt',
    Body: 'What?!'
};

const run = async () => {
    try {
        const data = await s3Client.send(
            new client.CreateBucketCommand({ Bucket: params.Bucket })
        );
        // console.log(data);
        console.log("Successfully created a bucket called ", data.Location);
        
    } catch (error) {
        console.error("Error", error);
    }

    try {
        const results = await s3Client.send(
            new client.PutObjectCommand(params)
        );
        console.log(`Successfully created ${params.Key} and uploaded it to ${params.Bucket}`);
        
    } catch (error) {
        console.error("Error", error);
    }
};
run();