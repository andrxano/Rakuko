const { Client, GatewayDispatchEvents, Collection, ActivityType } = require("discord.js");
const { Riffy } = require("riffy");
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
fs.readdirSync("./musiccommands").forEach(file => {
    const command = require(`./musiccommands/${file}`);
    client.commands.set(command.name, command);

    // Aliases
    if (command.aliases && command.aliases.length) {
        command.aliases.forEach(alias => {
            client.commands.set(alias, command);
        });
    }
});

fs.readdirSync("./utilitycommands").forEach(file => {
    if (file.endsWith(".js")) {
        const command = require(`./utilitycommands/${file}`);
        client.commands.set(command.name, command);

        if (command.aliases && command.aliases.length) {
            command.aliases.forEach(alias => {
                client.commands.set(alias, command);
            });
        }
    }
});

client.on("ready", () => {
    client.riffy.init(client.user.id);
    console.log(`Logged in as ${client.user.tag}`);

    // Set bot status and activity
    client.user.setPresence({
        activities: [{ name: `Music`, type: ActivityType.Listening }],
        status: 'online',
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

    const commandsRequiringVoiceChannel = ["play", "p", "pause", "resume", "seek", "remove", "queue", "skip", "shuffle", "stop", "nowplaying", "np"];
    if (commandsRequiringVoiceChannel.includes(command)) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply("You need to be in a voice channel to use this command!");
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
