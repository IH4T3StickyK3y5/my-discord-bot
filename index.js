// Import necessary modules
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Load environment variables from .env file

// Get the bot token from the environment variables
const token = process.env.BOT_TOKEN;

// Create a new Discord client with specified intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Make sure this is enabled in the Developer Portal
        GatewayIntentBits.GuildMembers,   // For member-related events (optional, but common)
        // Add other intents as needed for your bot's functionality
    ],
});

// Event: Bot is ready (logged in)
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setActivity('with Discord.js'); // Set a status (optional)
});

// Event: New message created
client.on(Events.MessageCreate, async (msg) => {
    // Ignore messages from other bots or itself to prevent loops
    if (msg.author.bot) return;

    // Basic command handler (prefix-based)
    const prefix = '!';
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        const sentMessage = await msg.channel.send('Pinging...');
        await sentMessage.edit(`Pong! Latency: ${sentMessage.createdTimestamp - msg.createdTimestamp}ms | API Latency: ${Math.round(client.ws.ping)}ms`);
    } else if (command === 'hello') {
        msg.reply(`Hello, ${msg.author.username}!`);
    } else if (command === 'userinfo') {
        msg.reply(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
    }
    // You can add more commands here
});

// Log in to Discord with your client's token
client.login(token);
