var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var ElastiCache = awssum.load('amazon/elasticache').ElastiCache;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var elastiCache = new ElastiCache({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
    'region'          : amazon.US_EAST_1
});

console.log( 'Region :', elastiCache.region() );
console.log( 'EndPoint :',  elastiCache.host() );
console.log( 'AccessKeyId :', elastiCache.accessKeyId() );
console.log( 'SecretAccessKey :', elastiCache.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId :', elastiCache.awsAccountId() );

elastiCache.DeleteCacheCluster(function(err, data) {
    console.log("\ndeleting cache cluster - expecting failure since no CacheClusterId given");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});

elastiCache.DeleteCacheCluster({ CacheClusterId : 'blah' }, function(err, data) {
    console.log("\ndeleting cache cluster - expecting failure since CacheClusterId does not exist");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
