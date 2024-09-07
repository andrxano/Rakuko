const { PermissionsBitField } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'stealemoji',
    description: 'Steals an emoji from another server and adds it to the current server.',
    async execute(client, message, args) {
        // Check if the user provided an emoji
        const emoji = args[0];
        if (!emoji) {
            return message.reply('Please provide an emoji to steal.');
        }

        // Get the emoji ID and check if it's a custom emoji
        const emojiRegex = /<a?:\w+:(\d+)>/;
        const emojiMatch = emoji.match(emojiRegex);
        if (!emojiMatch) {
            return message.reply('Please provide a valid custom emoji.');
        }

        const emojiId = emojiMatch[1];
        const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png`;

        // Check if the bot has permission to manage emojis
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
            return message.reply("I don't have permission to manage emojis.");
        }

        try {
            // Download the emoji image
            const response = await axios.get(emojiUrl, { responseType: 'arraybuffer' });
            const emojiBuffer = response.data;

            // Add the emoji to the server
            const emojiName = args[1] || `emoji_${emojiId}`; // Default name if none provided
            const newEmoji = await message.guild.emojis.create({ attachment: emojiBuffer, name: emojiName });

            message.reply(`Emoji successfully added: ${newEmoji}`);
        } catch (error) {
            console.error('Error adding emoji:', error);
            message.reply('There was an error trying to steal the emoji.');
        }
    },
};
