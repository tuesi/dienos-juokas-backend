const Discord = require('discord.js');
const client  = new Discord.Client();
const prefix = '!DJ';
const fs = require('fs');
const mongoose = require('mongoose');
const loading = require('./mongodb/loading');
const endpoints = require('./webEndpoints');
const {wakeDyno} = require('heroku-keep-awake');
const express = require("express");
const rateLimiter = require ('./middlewares/rateLimiter');
const cors = require('cors');
var app = express();

const opts = {
    interval: 20,
    logging: true,
    stopTimes: { start: '00:00', end: '00:00' }
}

app.use(rateLimiter, cors({origin: '*'}));

app.listen(process.env.PORT || 80, () => {
    console.log("Server running on port " + process.env.PORT);
    wakeDyno(process.env.BACKEND_LINK, opts);
   });

app.get("/", (req,res) => {
    res.send("ALIVE!");
    });

client.commands = new Discord.Collection();

const subscribers = new Array();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
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
});


client.on('message', message => {
    if(!message.content.toUpperCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length+1).split(/ +/);

    if(args[0].toString().toLowerCase() === 'dienos') {
        if(args[1].toString().toLowerCase() === 'juokas') {
            client.commands.get('dienos').execute(message, args, Discord);
        }
    }
    if(args[0].toString().toLowerCase() === 'prenumeruoti') {
        client.commands.get('prenumeruoti').execute(message, args, Discord, client);
    }
    if(args[0].toString().toLowerCase() === 'sustabdyti') {
        client.commands.get('sustabdyti').execute(message);
    }
    if(args[0].toString().toLowerCase() === 'help') {
        client.commands.get('help').execute(message);
    }
});

require('./messageSender.js')(client,Discord);

client.login(process.env.DISCORD_KEY);