const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases:["av"],
    description: 'Get the avatar of a user.',
    async execute(client, message, args) {
        let user = message.mentions.users.first() || message.author; // Get mentioned user or author if no user mentioned
        
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
