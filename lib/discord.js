module.exports = () => {
    const discordToken = process.env.DISCORD_TOKEN;
    const Discord = require('discord.js');

    const client = new Discord.Client({
        apiRequestMethod: 'burst'
    });

    console.log('about to connect');
    client.login(discordToken).catch(err => console.error(err));

    return {
        sendMessage: async (channelId, message) => {
            let channel = client.channels.get(channelId);
            await channel.send(message);
        }
    }
}