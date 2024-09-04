const { Client, GatewayDispatchEvents, Collection } = require("discord.js");
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

// Memuat semua command dan aliasnya
fs.readdirSync("./commands").forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    // Memetakan alias ke command yang sesuai
    if (command.aliases && command.aliases.length) {
        command.aliases.forEach(alias => {
            client.commands.set(alias, command);
        });
    }
});

client.on("ready", () => {
    client.riffy.init(client.user.id);
    console.log(`Logged in as ${client.user.tag}`);
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

client.riffy.on("queueEnd", async (player) => {
    const command = client.commands.get('queueend');
    if (command) {
        try {
            await command.execute(client, player);
        } catch (error) {
            console.error(error);
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
