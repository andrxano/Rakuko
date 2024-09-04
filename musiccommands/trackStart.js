const fs = require("fs");
const { Dynamic } = require("musicard");

module.exports = {
    name: "trackstart",
    async execute(client, player, track) {
        const channel = client.channels.cache.get(player.textChannel);

        Dynamic({
            thumbnailImage: track.info.thumbnail,
            backgroundImage: 'https://cdn.discordapp.com/attachments/1220001571228880917/1220001571690123284/01.png',
            backgroundColor: '#171717',
            imageDarkness: 60,
            name: track.info.title,
            nameColor: '#FF7A00',
            progressColor: '#FF7A00',
            author: track.info.author,
            progressBarColor: '#5F2D00',
            progress: 0,
            startTime: '0:00',
            endTime: '4:00',
            timeColor: '#FF7A00',
        }).then(x => {
            fs.writeFileSync('output.png', x);

            channel.send({
                content: `Now playing: \`${track.info.title}\` by \`${track.info.author}\`\nRequested by ${track.info.requester}.`,
                files: ['output.png'],
                allowedMentions: { parse: [] }
            });
        }).catch(error => {
            console.error('Error creating Musicard image:', error);
        });
    }
};
