module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Show the currently playing track.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player || !player.queue.current) return message.channel.send("No track currently playing.");
    
        const currentTrack = player.queue.current;
        message.channel.send(`Now playing: \`${currentTrack.info.title}\``);
    },
};
