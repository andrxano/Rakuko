module.exports = {
    name: "stop",
    aliases: ["dc", "disconnect", "leave"],
    description: "Stop the player and clear the queue.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.destroy();
        message.channel.send('Player has stopped! Thank you for listening.');
    },
};
