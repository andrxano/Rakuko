const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'listemojis',
    description: 'Displays a list of emojis from a specified server.',
    async execute(client, message, args) {
        if (args.length === 0) {
            return message.reply('Please provide a server ID.');
        }

        const serverId = args[0];
        const guild = client.guilds.cache.get(serverId);

        if (!guild) {
            return message.reply('I am not in the server with the specified ID.');
        }

        try {
            await guild.fetch(); // Ensure the guild data is fetched

            const emojis = guild.emojis.cache;

            if (emojis.size === 0) {
                return message.reply('No emojis found in the specified server.');
            }

            // Create an embed for the emoji list
            const embed = new EmbedBuilder()
                .setColor('#2b71ec')
                .setTitle('Server Emojis')
                .setDescription(emojis.map(emoji => emoji.toString()).join(' '));

            // Send the embed to the channel
            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching emojis from the specified server.');
        }
    },
};
