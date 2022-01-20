import { S3Client, CreateBucketCommand, PutObjectCommand, ListBucketsCommand, ListObjectsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({region: 'us-west-2'});

type Bucket = {
    Bucket: string,
    Key: string,
    Body: string
}

class BucketManager { 
    public params: Bucket;

    constructor(bucket?: string, key?: string, body?: string) {
        this.params = {
            Bucket: bucket,
            Key: key,
            Body: body
        };;
    }

    listBuckets = async () => {
        try {
            const data = await s3Client.send(
                new ListBucketsCommand({})
            );
            console.log("Success", data.Buckets);
            return data; // For unit tests
        } catch (error) {
            console.error("Error", error);
        }
    }

    listObjectsInABucket = async () => {
        try {
            const data = await s3Client.send(
                new ListObjectsCommand(this.params)
            );
            console.log("Success", data.Contents);
            return data; // For unit tests.
        } catch (error) {
            console.error("Error", error);
        }
    }
    
    createBucket = async () => {
        try {
            const data = await s3Client.send(
                new CreateBucketCommand({Bucket: this.params.Bucket})
            );
            console.log("Successfully created a bucket called ", data.Location);
            return data; // For unit tests
        } catch (error) {
            console.error("Error", error);
        }
    }

    putInsideBucket = async () => {
        try {
            const results = await s3Client.send(
                new PutObjectCommand(this.params)
            );
            console.log(`Successfully created ${this.params.Key} and uploaded it to ${this.params.Bucket}`);
            return results; // For unit tests
        } catch (error) {
            console.error("Error", error);
        }
    }
}

let ekwe = new BucketManager('node-sample-bucket-ekwe');
ekwe.listObjectsInABucket();