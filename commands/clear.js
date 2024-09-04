module.exports = {
    name: "clear",
    description: "Clear the current queue.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
        
        player.queue.clear();
        message.channel.send('Queue cleared!');
    },
};
