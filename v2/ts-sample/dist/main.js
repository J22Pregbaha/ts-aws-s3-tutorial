"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
let bucketName = `ts-sdk-sample-${(0, uuid_1.v4)()}`;
let keyName = 'hello_world.txt';
let s3 = new aws_sdk_1.S3({ apiVersion: "2006-03-01" });
let bucketPromise = s3.createBucket({ Bucket: bucketName }).promise();
bucketPromise.then(() => {
    var objectParams = {
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
//# sourceMappingURL=main.js.map