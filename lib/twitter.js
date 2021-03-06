module.exports = () => {
    let Twitter = require('twitter');
    let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });

    let onStream = (action, err) => {
        client.stream('statuses/filter', {
            follow: process.env.FOLLOW_IDS
        }, (stream) => {
            stream.on('data', action);
            stream.on('error', err);
        });
    }

    return {
        onStream
    }
}