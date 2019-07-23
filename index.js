(async () => {
    require('dotenv').config();

    const channelId = process.env.CHANNEL_ID;
    const userIds = process.env.FOLLOW_IDS.split(',');
    const twitter = require('./lib/twitter')();
    const discord = require('./lib/discord')();

    twitter.onStream((event) => {
        if (!event.in_reply_to_screen_name && userIds.includes(event.user.id_str)) {
            if (event.retweeted_status && userIds.includes(event.retweeted_status.user.id_str)){
                return;
            }
            
            discord.sendMessage(channelId, `https://twitter.com/${event.user.screen_name}/status/${event.id_str}`);
        }
    }, (err) => {
        console.error(err);
    })
})()
.catch(err => {
    console.error(err);
});