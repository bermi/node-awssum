var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var Ses = awssum.load('amazon/ses').Ses;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var ses = new Ses({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
});

console.log( 'Region :', ses.region() );
console.log( 'EndPoint :',  ses.host() );
console.log( 'AccessKeyId :', ses.accessKeyId() );
console.log( 'SecretAccessKey :', ses.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId :', ses.awsAccountId() );

ses.ListVerifiedEmailAddresses(function(err, data) {
    console.log("\nlisting verified email addresses - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
