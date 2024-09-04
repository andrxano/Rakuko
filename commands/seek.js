module.exports = {
    name: "seek",
    description: "Seek to a specific time in the current track.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");

        const positionInSeconds = parseInt(args[0]);
        if (isNaN(positionInSeconds)) return message.channel.send("**Invalid position. Please provide a valid number of seconds.**");

        const positionInMillis = positionInSeconds * 1000;
        player.seek(positionInMillis);
        message.channel.send(`Seeked to ${positionInSeconds} seconds.`);
    },
};
