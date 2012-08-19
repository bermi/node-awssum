var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var Sns = awssum.load('amazon/sns').Sns;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sns = new Sns({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
    'region'          : amazon.US_EAST_1
});

console.log( 'Region :', sns.region() );
console.log( 'EndPoint :',  sns.host() );
console.log( 'AccessKeyId :', sns.accessKeyId() );
console.log( 'SecretAccessKey :', sns.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId :', sns.awsAccountId() );

sns.DeleteTopic({ TopicArn : 'fakeTopicArn' }, function(err, data) {
    console.log('\nDeleting this topicArn - expecting failure since it doesn\'t exist');
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});

sns.DeleteTopic({}, function(err, data) {
    console.log('\nDeleting an undefined topicArn - expecting failure since we didn\'t provide a TopicArn');
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});

// firstly, re-create this topic (it's idempotent) to get the topicArn
sns.CreateTopic({ Name : 'my-topic' }, function(err, data) {
    console.log('\nCreating (my-topic) - expecting success');
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');

    // now delete it again
    if ( ! err ) {
        var topicArn = data.CreateTopicResponse.CreateTopicResult.TopicArn;
        sns.DeleteTopic({ TopicArn : topicArn }, function(err, data) {
            console.log('\ndeleting topic (my-topic) - expecting success');
            fmt.dump(err, 'Error');
            fmt.dump(data, 'Data');
        });
    }
});
