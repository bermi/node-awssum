var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var CloudFront = awssum.load('amazon/cloudfront').CloudFront;

var env             = process.env;
var accessKeyId     = env.ACCESS_KEY_ID;
var secretAccessKey = env.SECRET_ACCESS_KEY;
var awsAccountId    = env.AWS_ACCOUNT_ID;

var cloudFront = new CloudFront({
    'accessKeyId' : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'awsAccountId' : awsAccountId,
    'region' : amazon.US_EAST_1
});

fmt.field('Region', cloudFront.region() );
fmt.field('EndPoint', cloudFront.host() );
fmt.field('AccessKeyId', cloudFront.accessKeyId() );
fmt.field('SecretAccessKey', cloudFront.secretAccessKey().substr(0, 3) + '...' );
fmt.field('AwsAccountId', cloudFront.awsAccountId() );

cloudFront.ListDistributions(function(err, data) {
    fmt.msg("listing distributions - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
