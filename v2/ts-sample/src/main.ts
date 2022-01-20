import { S3 } from "aws-sdk";
import { v4 } from "uuid";

type Bucket = {
    Bucket: string,
    Key: string,
    Body: string
}

let bucketName: string = `ts-sdk-sample-${v4()}`;
let keyName: string = 'hello_world.txt';

let s3 = new S3({apiVersion: "2006-03-01"});

let bucketPromise = s3.createBucket({Bucket: bucketName}).promise();

bucketPromise.then(() => {
    let objectParams: Bucket = {
        Bucket: bucketName,
        Key: keyName,
        Body: "Hello World!"
    };

    let uploadPromise = s3.putObject(objectParams).promise();
    uploadPromise.then((data) => {
        console.log(data);
    });
}).catch((error) => {
    console.error(error, error.stack);
    
});