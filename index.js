const { Client, GatewayDispatchEvents, Collection, ActivityType } = require("discord.js");
const { Riffy } = require("riffy");
const path = require('path');
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "GuildMessageReactions",
        "MessageContent",
        "DirectMessages",
    ],
});

client.commands = new Collection();
client.riffy = new Riffy(client, config.nodes, {
    send: (payload) => {
        const guild = client.guilds.cache.get(payload.d.guild_id);
        if (guild) guild.shard.send(payload);
    },
    defaultSearchPlatform: "ytsearch",
    restVersion: "v4",
});

// Load all commands and aliases
function loadCommandsFromFolders(client, folders) {
    folders.forEach(folder => {
        const commandPath = path.join(__dirname, folder);
        fs.readdirSync(commandPath).forEach(file => {
            if (file.endsWith('.js')) {
                const command = require(`${commandPath}/${file}`);
                client.commands.set(command.name, command);

                // Aliases support
                if (command.aliases && command.aliases.length) {
                    command.aliases.forEach(alias => {
                        client.commands.set(alias, command);
                    });
                }
            }
        });
    });
}
const commandFolders = ['./musiccommands', './utilitycommands', './funcommands', './imagecommands'];
loadCommandsFromFolders(client, commandFolders);

client.once("ready", () => {
    client.riffy.init(client.user.id);
    console.log(`Logged in as ${client.user.tag}`);

    // Set bot status and activity
    client.user.setPresence({
        activities: [{ name: `Experiment Bot`, type: ActivityType.Custom }],
        status: 'dnd',
      });
    // Options: 'PLAYING', 'WATCHING', 'COMPETING'
});

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error executing that command.");
        }
    }
});

client.riffy.on("nodeConnect", (node) => {
    console.log(`Node "${node.name}" connected.`);
});

client.riffy.on("nodeError", (node, error) => {
    console.log(`Node "${node.name}" encountered an error: ${error.message}.`);
});

client.riffy.on("trackStart", async (player, track) => {
    const command = client.commands.get('trackstart');
    if (command) {
        try {
            await command.execute(client, player, track);
        } catch (error) {
            console.error(error);
        }
    }
});

client.riffy.on('queueEnd', async (player) => {
    const channel = client.channels.cache.get(player.textChannel);

    // Set this to true if you want to enable autoplay.
    const autoplay = false;

    if (autoplay) {
        player.autoplay(player);
    } else {
        player.destroy();
        if (channel) {
            channel.send('Queue has ended.');
        }
    }
});

client.on("raw", (d) => {
    if (
        ![
            GatewayDispatchEvents.VoiceStateUpdate,
            GatewayDispatchEvents.VoiceServerUpdate,
        ].includes(d.t)
    )
        return;
    client.riffy.updateVoiceState(d);
});

client.login(config.token);
