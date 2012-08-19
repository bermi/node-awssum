var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var S3 = awssum.load('amazon/s3').S3;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var s3 = new S3({
    'accessKeyId' : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'region' : amazon.US_EAST_1
});

console.log( 'Region :', s3.region() );
console.log( 'EndPoint :',  s3.host() );
console.log( 'AccessKeyId :', s3.accessKeyId() );
console.log( 'SecretAccessKey :', s3.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId :', s3.awsAccountId() );

s3.DeleteBucketLifecycle({ BucketName : 'pie-18' }, function(err, data) {
    console.log("\ndelete bucket lifecycle - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});

s3.DeleteBucketLifecycle({ BucketName : 'pie-18-not-found' }, function(err, data) {
    console.log("\ndelete bucket lifecycle - expecting failure (Bucket Does Not Exist)");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
