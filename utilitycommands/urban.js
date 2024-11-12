const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'urban',
    aliases: ['ud'],
    description: 'Fetches a definition from Urban Dictionary.',
    async execute(client, message, args) {
        if (!args.length) {
            return message.reply("Please provide a word to search for!");
        }

        const query = args.join(" ");
        const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`;

        try {
            const { data } = await axios.get(url);
            if (!data.list.length) {
                return message.reply("No results found for that term!");
            }

            // Get the first result
            const definition = data.list[0];

            // Create an embed for the Urban Dictionary result
            const embed = new EmbedBuilder()
                .setColor('#f7931e')
                .setTitle(definition.word)
                .setURL(definition.permalink)
                .addFields(
                    { name: 'Definition', value: definition.definition.length > 1024 ? `${definition.definition.substring(0, 1021)}...` : definition.definition },
                    { name: 'Example', value: definition.example.length > 1024 ? `${definition.example.substring(0, 1021)}...` : definition.example },
                    { name: '👍 Upvotes', value: `${definition.thumbs_up}`, inline: true },
                    { name: '👎 Downvotes', value: `${definition.thumbs_down}`, inline: true }
                )
                .setFooter({ text: `Author: ${definition.author}` });

            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply("There was an error fetching the definition. Please try again later.");
        }
    }
};
