const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const joke = require('../lists/jokeParams');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dienosjuokas")
        .setDescription("Siandienos juokas"),
    async execute(interaction) {
        var date = new Date();
        const newEmbed = new DiscordJS.MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('Dienos Juokas')
            .setDescription(`${joke.joke}`);
           
        if(date.getHours() >= 11){
            interaction.reply({embeds: [newEmbed]});
        } else {
            interaction.reply("``Dienos juokas rodomas nuo 13:00. \n\n Norintiems dienos juoka gauti anskciau prasome prenumeruoti.``");
        }
    }
}