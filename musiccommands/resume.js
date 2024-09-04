module.exports = {
    name: "resume",
    description: "Resume the current track.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.pause(false);
        message.channel.send('Playback resumed!');
    },
};
