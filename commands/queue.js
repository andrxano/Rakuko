module.exports = {
    name: "queue",
    aliases: ["q", "list"],
    description: "Show the current queue.",
    async execute(client, message, args) {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player || player.queue.size === 0) return message.channel.send("The queue is currently empty.");
    
        const queueList = player.queue.map((track, index) => `${index + 1}. ${track.info.title}`).join("\n");
        const chunks = queueList.match(/(.|\n){1,1999}/g);

        chunks.forEach(chunk => {
            message.channel.send(chunk);
        });
    },
};
