const { SlashCommandBuilder } = require("@discordjs/builders");
const mentions = require('../lists/mentions.js');
const emails = require('../lists/emails.js');
const saveEmail = require('../mongodb/saveEmail');
const saveMention = require('../mongodb/saveMention');
const validator = require('email-validator');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("prenumeruoti")
        .setDescription("Dienos juoko prenumerata!")
        .addUserOption(option => {
            return option
                .setName("discordtag")
                .setDescription("Discord tag'as")
                .setRequired(false)
        })
        .addStringOption(option => {
            return option
                .setName("email")
                .setDescription("Email'as")
                .setRequired(false)
        }),
    async execute(interaction) {
        var je;
        var what;
        var vaje;
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "lmao")){
            je = interaction.client.emojis.cache.find(emoji => emoji.name === "lmao");
        }
        else {
            je = ":joy:";
        }
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "steniu")){
            what = interaction.client.emojis.cache.find(emoji => emoji.name === "steniu");
        }
        else {
            what = ":partying_face:";
        }
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "aurim2")){
            vaje = interaction.client.emojis.cache.find(emoji => emoji.name === "aurim2");
        }
        else {
            vaje = ":face_with_raised_eyebrow:";
        }
        if(interaction.options.getUser("discordtag")){
            if(!mentions.includes(interaction.options.getUser("discordtag").id)){
                console.log(interaction.options.getUser("discordtag").id);
                interaction.reply(`Dienos juokas uzprenumeruotas ${interaction.options.getUser("discordtag")} ${je}`);
                mentions.push(interaction.options.getUser("discordtag").id);
                saveMention();
            } else {
                interaction.reply("``Dienos juokas jau uzprenumeruotas!``" + `${what}`);
            }
        }
        else if(interaction.options.getString("email")){
            if(!emails.includes(interaction.options.getString("email"))){
                if(validator.validate(await interaction.options.getString("email"))){
                    interaction.reply(`Dienos juokas uzprenumeruotas ${interaction.member.user} ${je}`);
                    emails.push(interaction.options.getString("email"));
                    saveEmail();
                }
                else{
                    interaction.reply("``Tikrai tavo toks emailas?``" + `${vaje}`);
                }
                
            } else {
                interaction.reply("``Dienos juokas jau uzprenumeruotas!``" + `${what}`);
            }
        }
        else {
            interaction.reply("``Nebuvo nurodytas discord tag'as arba email'as``" + `${vaje}`);
        }
    }
}