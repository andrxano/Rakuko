module.exports = {
    name: "pause",
    description: "Pause the current track.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.pause(true);
        message.channel.send('Playback paused!');
    },
};
