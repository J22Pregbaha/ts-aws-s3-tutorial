"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client = new client_s3_1.S3Client({ region: 'us-west-2' });
class BucketManager {
    constructor(bucket, key, body) {
        this.createBucket = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield s3Client.send(new client_s3_1.CreateBucketCommand({ Bucket: this.params.Bucket }));
                console.log("Successfully created a bucket called ", data.Location);
                return data; // For unit tests
            }
            catch (error) {
                console.error("Error", error);
            }
        });
        this.listBuckets = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield s3Client.send(new client_s3_1.ListBucketsCommand({}));
                console.log("Success", data.Buckets);
                return data; // For unit tests
            }
            catch (error) {
                console.error("Error", error);
            }
        });
        this.listObjectsInABucket = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield s3Client.send(new client_s3_1.ListObjectsCommand(this.params));
                console.log("Success", data.Contents);
                return data; // For unit tests.
            }
            catch (error) {
                console.error("Error", error);
            }
        });
        this.putInsideBucket = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield s3Client.send(new client_s3_1.PutObjectCommand(this.params));
                console.log(`Successfully created ${this.params.Key} and uploaded it to ${this.params.Bucket}`);
                return results; // For unit tests
            }
            catch (error) {
                console.error("Error", error);
            }
        });
        this.deleteBucket = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield s3Client.send(new client_s3_1.DeleteBucketCommand(this.params));
                console.log("Success - bucket deleted");
                return data; // For unit tests
            }
            catch (error) {
                console.error("Error", error);
            }
        });
        this.params = {
            Bucket: bucket,
            Key: key,
            Body: body
        };
        ;
    }
}
let ekwe = new BucketManager('v3-node-sample-bucket-ekwe');
ekwe.deleteBucket();
//# sourceMappingURL=index.js.map