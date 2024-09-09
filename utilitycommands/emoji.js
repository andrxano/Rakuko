module.exports = {
    name: 'emoji',
    aliases: ["e", "em"],
    description: 'Send an emoji from another server',
    async execute(client, message, args) {
        // Make sure users provide emoji arguments.
        if (args.length === 0) return message.reply('Please provide an emoji.');

        const emojiArg = args[0];
        let emoji;

        // Check if this is a custom emoji with ID
        if (emojiArg.startsWith('<:') || emojiArg.startsWith('<a:')) {
            emoji = emojiArg;
        } else {
            // Convert emoji names to lowercase (case-insensitive)
            const emojiName = emojiArg.replace(/:/g, '').toLowerCase();
            
            // Search for emoji on all servers the bot accesses
            const emojiList = client.guilds.cache
                .map(guild => guild.emojis.cache.find(e => e.name.toLowerCase() === emojiName)) // Case-insensitive comparison
                .filter(Boolean);
            
            if (emojiList.length > 0) {
                emoji = emojiList[0].toString();
            } else {
                return message.reply('Emoji not found.');
            }
        }
        message.reply(emoji);
    },
};
