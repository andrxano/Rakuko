const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'owner',
    description: 'Owner Information',
    async execute(client, message, args) {
        const ownerEmbed = new EmbedBuilder()
            .setColor('#f7931e')
            .setTitle('Owner Information')
            .setDescription('This bot is made by me, andreano. This bot is available on my Github')
            .setImage('https://media.discordapp.net/attachments/1046080161168232610/1281897896605782036/Me.jpg?ex=66dd63f3&is=66dc1273&hm=3f066910e103dd23e6bbabb3fd1c7cd2a4c72692434d3db2ea26e9fe7e78aa5d&=&format=webp&width=600&height=600')
            .setTimestamp();

        // Buat tombol untuk link GitHub
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('GitHub Repository')
                    .setURL('https://github.com/andrxano/rakuko')
                    .setStyle(ButtonStyle.Link)
            );

        // Kirim embed beserta tombolnya
        message.channel.send({ 
            embeds: [ownerEmbed], 
            components: [row] 
        });
    }
};
