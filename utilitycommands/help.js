const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows an interactive help menu.',
    async execute(client, message, args) {
        // Initial help embed
        const helpEmbed = new EmbedBuilder()
            .setTitle('Help Menu')
            .setDescription('Choose a category below to view available commands.\n For more information, visit my [Github](https://github.com/andrxano/Rakuko).')
            .setColor('#f7931e')
            .setImage('https://cdn.discordapp.com/attachments/1046080161168232610/1280925141231993003/lv_0_20240904231526.gif?ex=66d9da00&is=66d88880&hm=b6620f465ae8594cf9114cb858a51d9adfb260656e0f17fcd85c48ac0d94fdb3&')
            .setFooter({
                text: 'Rakuko',
                iconURL: 'https://cdn.discordapp.com/attachments/1276771043347922954/1281064958997823581/Rakuko_Logo.png?ex=66da5c37&is=66d90ab7&hm=eb4d814a013bf83eb0771fbdd1e3a33df870ebc946c5894b8b3cec6a16923ec8&' // URL of the GIF
            });

        // Create buttons for navigation
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('general')
                    .setLabel('General Commands')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('music')
                    .setLabel('Music Commands')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('fun')
                    .setLabel('Fun Commands')
                    .setStyle(ButtonStyle.Secondary)
            );

        // Send the initial help message with buttons
        const messageWithButtons = await message.channel.send({ embeds: [helpEmbed], components: [row] });

        // Create a collector to handle button interactions
        const filter = interaction => interaction.isButton() && interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async interaction => {
            if (interaction.customId === 'general') {
                await interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('General Commands')
                            .setDescription('Here are the general commands:\n- `!ping`\n- `!avatar`\n- `!help`\n- `!emoji`\n- `!listemojis`')
                            .setColor('#f7931e')
                    ],
                    components: [row]
                });
            } else if (interaction.customId === 'music') {
                await interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Music Commands')
                            .setDescription('Here are the music commands:\n- `!play`\n- `!skip`\n- `!stop`\n- `!queue`\n- `!loop`\n- `!pause`\n- `!resume`\n- `!remove`\n- `!shuffle`\n- `!seek`\n- `!nowplaying`')
                            .setColor('#5865F2')
                    ],
                    components: [row]
                });
            } else if (interaction.customId === 'fun') {
                await interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Fun Commands')
                            .setDescription('Here are the fun commands:\n- `!fasttype`\n- `!wordle`')
                            .setColor('#ffe100')
                    ],
                    components: [row]
                });
            }
        });

        // If no interaction, disable the buttons after timeout
        collector.on('end', () => {
            const disabledRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('general')
                        .setLabel('General Commands')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('music')
                        .setLabel('Music Commands')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('fun')
                        .setLabel('Fun Commands')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                );

            messageWithButtons.edit({ components: [disabledRow] });
        });
    }
};
