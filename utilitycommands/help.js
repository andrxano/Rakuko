const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ["h"],
    description: 'Displays a list of available commands.',
    execute(client, message, args) {
        // Create an embed for the help command
        const embed = new EmbedBuilder()
            .setColor('#f7931e')
            .setTitle('Available Commands')
            .setDescription('Here is a list of commands you can use:')
            .addFields(
                { name: '-play or -p', value: 'Plays a song from a query or URL.' },
                { name: '-skip', value: 'Skips to the next track in the queue.' },
                { name: '-pause', value: 'Pauses the current track.' },
                { name: '-resume', value: 'Resumes the paused track.' },
                { name: '-stop', value: 'Stops the playback and leaves the voice channel.' },
                { name: '-loop (track | queue | none)', value: 'Sets the loop mode for the queue or track.' },
                { name: '-shuffle', value: 'Shuffles the tracks in the queue.' },
                { name: '-queue', value: 'Displays the current queue.' },
                { name: '-remove (number of track)', value: 'Removes a track from the queue by index.' },
                { name: '-nowplaying', value: 'Shows the currently playing track.' },
                { name: '-avatar or -av', value: 'Displays the avatar of a mentioned user or yourself.' },
                { name: '-ping', value: 'Shows the bot\'s latency.' },
                { name: '-emoji or -em or -e', value: 'Send custom emojis from other servers' }
            )
            .setFooter({ text: 'Use the commands with the prefix you have set.' });

        // Send the embed to the channel
        message.reply({ embeds: [embed] });
    },
};
