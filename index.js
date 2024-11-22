require('dotenv').config();
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');


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

// OLD event handlers (moved to events folder)
// client.once(Events.ClientReady, readyClient => {
//         console.log(`Ready! Logged in as ${readyClient.user.tag}`);
// });

// client.on(Events.InteractionCreate, async readyClient => {
//     if (!interaction.isChatInputCommand()) return;
//     const command = interaction.client.command.get(interaction.commandName);

//     if (!comand) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({ 
//                 content: 'There was an error while executing this command!', 
//                 ephermal: true
//             });
//         } else {
//             await interaction.reply({
//                 content: 'There was an error while executing this command!', 
//                 ephermal: true
//             });
//         }
//     }    
// });

// Login
client.login(process.env.DISCORD_TOKEN);