(async () => {
    require('dotenv').config();

    const channelId = process.env.CHANNEL_ID;
    const userIds = process.env.FOLLOW_IDS.split(',');
    const twitter = require('./lib/twitter')();
    const discord = require('./lib/discord')();

    twitter.onStream((event) => {
        if (userIds.includes(event.user.id_str)) {
            discord.sendMessage(channelId, `https://twitter.com/statuses/${event.id}`);
        }
    }, (err) => {
        console.error(err);
    })
})()
.catch(err => {
    console.error(err);
});