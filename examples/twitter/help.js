var fmt = require('fmt');
var commander = require('commander');
var awssum = require('awssum');
var oauth = awssum.load('oauth');
var Twitter = awssum.load('twitter/twitter').Twitter;

var env            = process.env;
var consumerKey    = env.TWITTER_CONSUMER_KEY;
var consumerSecret = env.TWITTER_CONSUMER_SECRET;
var token          = env.TWITTER_TOKEN;
var tokenSecret    = env.TWITTER_TOKEN_SECRET;
// don't need the verifier

var twitter = new Twitter({
    'consumerKey'    : consumerKey,
    'consumerSecret' : consumerSecret
});

twitter.setToken(token);
twitter.setTokenSecret(tokenSecret);

fmt.field('ConsumerKey', twitter.consumerKey()                          );
fmt.field('ConsumerSecret', twitter.consumerSecret().substr(0, 3) + '...'  );
fmt.field('Token', twitter.token()                                );
fmt.field('TokenSecret', twitter.tokenSecret().substr(0, 3) + '...'     );

twitter.Test(function(err, data) {
    fmt.msg('\ncalling help/test - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});

twitter.Configuration(function(err, data) {
    fmt.msg('\ncalling help/configuration - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});

twitter.Languages(function(err, data) {
    fmt.msg('\ncalling help/languages - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});
