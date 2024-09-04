module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");

        player.queue.shuffle();
        message.channel.send('Shuffled queue!');
    },
};
