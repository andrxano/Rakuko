module.exports = {
    name: 'emoji',
    aliases: ["e", "em"],
    description: 'Send an emoji from another server',
    async execute(client, message, args) {
        // Check if any arguments were provided (emoji)
        if (args.length === 0) return message.reply('Please provide an emoji.');

        const emojiArg = args[0]; 
        let emoji;

        // Check if it's a custom emoji with an ID
        if (emojiArg.startsWith('<:') && emojiArg.endsWith('>')) {
            emoji = emojiArg;
        } else {
            // Format emoji name by removing colons (:)
            const emojiName = emojiArg.replace(/:/g, '');
            
            // Search for the emoji by name across all guilds the bot is in
            const emojiList = client.guilds.cache
                .map(guild => guild.emojis.cache.find(e => e.name === emojiName))
                .filter(Boolean);  // Filter out any non-existing emojis

            // If emoji is found, send it
            if (emojiList.length > 0) {
                emoji = emojiList[0].toString();
            } else {
                // If emoji is not found, reply with an error message
                return message.reply('Emoji not found.');
            }
        }

        // Send the emoji back to the same channel
        message.reply(emoji);
    },
};
