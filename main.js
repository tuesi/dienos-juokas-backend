const { DiscordJS, Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client  = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const prefix = '!DJ';
const fs = require('fs');
const mongoose = require('mongoose');
const loading = require('./mongodb/loading');
const endpoints = require('./webEndpoints');
const express = require("express");
const rateLimiter = require ('./middlewares/rateLimiter');
const cors = require('cors');
var app = express();
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');

const opts = {
    interval: 20,
    logging: true,
    stopTimes: { start: '00:00', end: '00:00' }
}

app.use(rateLimiter, cors({origin: '*'}));

app.listen(process.env.PORT || 80, () => {
    console.log("Server running on port " + process.env.PORT);
   });

app.get("/", (req,res) => {
    res.send("ALIVE!");
    });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const commands = [];
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
    //client.commands.set(command.name, command);
}
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

loading();
endpoints.unsubscribe(app);
endpoints.subscribe(app);
endpoints.dailyJoke(app);

client.once('ready', () => {
    console.log('BOT is online');
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.DISCORD_KEY);
    (async () => {
        try {
            if(process.env.ENV === "production"){
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Registered commands");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Registered dev commands");
            }
        } catch (err) {
            console.log(err);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.log(err);
        await interaction.reply({
            content: " An error occurred while executing that command.",
            ephemeral: true
        });
    }
});

require('./messageSender.js')(client,DiscordJS);

client.login(process.env.DISCORD_KEY);