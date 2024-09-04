module.exports = {
    name: 'avatar',
    aliases: ["av", "icon"],
    description: 'Displays the avatar of the user.',
    async execute(client, message, args) {
        let user;
        if (args.length > 0) {
            // If an ID or mention is provided
            user = message.mentions.users.first() || client.users.cache.get(args[0]);
        } else {
            // Default to the message author
            user = message.author;
        }

        if (!user) {
            return message.reply("User not found.");
        }

        const avatarURL = user.displayAvatarURL({ size: 2048, dynamic: true });
        message.reply(`Avatar of ${user.tag}: ${avatarURL}`);
    },
};
