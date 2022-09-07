const cron = require('cron').CronJob;
const mentions = require('./lists/mentions.js');
const emails = require('./lists/emails.js');
const sendEmail = require('./sendEmail.js');
const saveJoke = require('./mongodb/saveDailyJoke.js');
const getJoke = require('./get-joke.js');
const joke = require('./lists/jokeParams');
const loadJoke = require('./mongodb/loadJoke');
const DiscordJS = require("discord.js");

module.exports = (client, Discord) => {  

    var genNewJoke = new cron('59 11 * * *', function(){
        loadJoke();
    }, null, true, 'Europe/Vilnius');

    var job = new cron('00 12 * * *', function() {
        const newEmbed = new DiscordJS.MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('Dienos Juokas')
            .setDescription(`${joke.joke}`);

            mentions.forEach(mention => {
                client.users.fetch(mention,false).then((user) => {
                    user.send({embeds: [newEmbed]}).catch(console.error);
                });
            });

            emails.forEach(email => {
                sendEmail.sendEmail(email,joke.joke);
            });

      }, null, true, 'Europe/Vilnius');
      job.start();
      genNewJoke.start();
}
