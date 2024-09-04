const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ["av"],
    description: 'Get the avatar of a user.',
    async execute(client, message, args) {
        let user;

        // Check if a user ID or mention is provided
        if (args[0]) {
            try {
                user = await client.users.fetch(args[0]);
            } catch (error) {
                return message.reply("Couldn't find a user with that ID.");
            }
        } else {
            user = message.mentions.users.first() || message.author;
        }

        // Create an embed with the user's avatar
        const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s Avatar`)
            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor('#f7931e')
            .setFooter({ text: 'Requested by ' + message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        // Send the embed
        message.channel.send({ embeds: [embed] });
    }
};
