module.exports = {
    name: "play",
    aliases: ["p", "start"],
    description: "Plays a song in the voice channel.",
    async execute(client, message, args) {
        const query = args.join(" ");
        
        const player = client.riffy.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            deaf: true,
        });

        const resolve = await client.riffy.resolve({
            query: query,
            requester: message.author,
        });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === "playlist") {
            for (const track of resolve.tracks) {
                track.info.requester = message.author;
                player.queue.add(track);
            }

            message.channel.send(
                `Added: \`${tracks.length} tracks\` from \`${playlistInfo.name}\``
            );
            if (!player.playing && !player.paused) return player.play();
        } else if (loadType === "search" || loadType === "track") {
            const track = tracks.shift();
            track.info.requester = message.author;

            player.queue.add(track);
            message.channel.send(`Added: \`${track.info.title}\``);
            if (!player.playing && !player.paused) return player.play();
        } else {
            return message.channel.send("There are no results found.");
        }
    }
};
