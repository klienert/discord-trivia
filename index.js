require('dotenv').config();
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('node:path');


const client = new Client ({
    intents: [GatewayIntentBits.Guilds]
});

// load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.name, command);    
    } else {
        console.log(`[WARNING] The command at ./commands/${file} is missing a required "data" or "execute" property.`);
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);    
    if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {        
		client.on(event.name, (...args) => event.execute(...args));
	}  
}

// Login
client.login(process.env.DISCORD_TOKEN);