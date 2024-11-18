require('dotenv').config();
const { Client, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client ({
    intents: [Intents.FLAGS.GUILDS, INTENTS.FLAGS.GUILD_MESSAGES]
});

// load commands
client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// event handlers
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction);
});

// Login
client.login(process.env.DISCORD_TOKEN);