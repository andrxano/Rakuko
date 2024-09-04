module.exports = {
    name: 'ping',
    description: 'Ping the bot to check latency.',
    execute(client, message, args) {
        const latency = Date.now() - message.createdTimestamp;
        message.reply(`Pong!\nLatency is \`${latency}\`ms.`);
    },
};
