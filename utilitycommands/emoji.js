module.exports = {
    name: 'emoji',
    aliases: ["e", "em"],
    description: 'Send an emoji from another server',
    async execute(client, message, args) {
        // Args format: :emoji_name: or emoji_id
        if (args.length === 0) return message.reply('Please provide an emoji.');
        
        const emojiArg = args[0];
        let emoji;

        // Check if it's a custom emoji by checking if it contains ID
        if (emojiArg.startsWith('<:') && emojiArg.endsWith('>')) {
            emoji = emojiArg;
        } else {
            // Convert emoji name to format
            const emojiName = emojiArg.replace(/:/g, '');
            // Search for the emoji by name
            const emojiList = client.guilds.cache
                .map(guild => guild.emojis.cache.find(e => e.name === emojiName))
                .filter(Boolean);
            
            if (emojiList.length > 0) {
                emoji = emojiList[0].toString();
            } else {
                return message.reply('Emoji not found.');
            }
        }
        
        // Send the emoji to the same channel
        message.channel.reply(emoji);
    },
};
