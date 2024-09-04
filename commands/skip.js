module.exports = {
    name: "skip",
    aliases: ["next"],
    description: "Skip to the next track.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.stop();
        message.channel.send('Skipped to the next track!');
    },
};
