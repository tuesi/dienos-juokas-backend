const joke = require('../lists/jokeParams');

module.exports = {
    name: 'dienos',
    description: "Dienos juokas!",
    execute(message, args, Discord) {
        var date = new Date();
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('Dienos Juokas')
            .setDescription(joke.joke);
           
        if(date.getHours() >= 11){
            message.channel.send(newEmbed);
        } else {
            message.channel.send("``Dienos juokas rodomas nuo 13:00. \n\n Norintiems dienos juoka gauti anskciau prasome prenumeruoti.``");
        }
    }
}