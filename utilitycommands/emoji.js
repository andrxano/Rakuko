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
        if ((emojiArg.startsWith('<:') || emojiArg.startsWith('<a:')) && emojiArg.endsWith('>')) {
            // It's a custom emoji (either animated or static)
            emoji = emojiArg;
        } else {
            // Convert emoji name to format
            const emojiName = emojiArg.replace(/:/g, '');

            // Search for the emoji by name
            const emojiList = client.guilds.cache
                .flatMap(guild => guild.emojis.cache)
                .filter(e => e.name === emojiName);

            if (emojiList.length > 0) {
                const foundEmoji = emojiList[0];

                // Check if the emoji is animated
                if (foundEmoji.animated) {
                    emoji = `<a:${foundEmoji.name}:${foundEmoji.id}>`;  // Animated emoji
                } else {
                    emoji = `<:${foundEmoji.name}:${foundEmoji.id}>`;  // Static emoji
                }
            } else {
                return message.reply('Emoji not found.');
            }
        }

        // Send the emoji to the same channel
        message.channel.send(emoji);
    },
};
