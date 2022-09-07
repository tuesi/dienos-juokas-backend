const { SlashCommandBuilder } = require("@discordjs/builders");
const mentions = require('../lists/mentions.js');
const emails = require('../lists/emails.js');
const saveEmail = require('../mongodb/saveEmail');
const saveMention = require('../mongodb/saveMention');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("nebeprenumeruoti")
        .setDescription("Dienos juoko prenumeratos nutraukimas!")
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
        var vaje;
        var what;
        var really;
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "aurim2")){
            really = interaction.client.emojis.cache.find(emoji => emoji.name === "aurim2");
        }
        else {
            really = ":face_with_raised_eyebrow:";
        }
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "steniu")){
            what = interaction.client.emojis.cache.find(emoji => emoji.name === "steniu");
        }
        else {
            what = ":pensive:";
        }
        if(interaction.client.emojis.cache.find(emoji => emoji.name === "viespatie")){
            vaje = interaction.client.emojis.cache.find(emoji => emoji.name === "viespatie");
        }
        else {
            vaje = ":smiling_face_with_tear:";
        }
        if(interaction.options.getUser("discordtag")){
            if(mentions.includes(interaction.options.getUser("discordtag").id)){
                interaction.reply(`Dienos juoko prenumerata nutraukta ${interaction.options.getUser("discordtag")} ${vaje}`);
                mentions.splice(mentions.indexOf(interaction.options.getUser("discordtag").id),1);
                saveMention();
            } else {
                interaction.reply("``Sis vartotojas prenumeratos neturi.``" + `${what}`);
            }
        }
        else if(interaction.options.getString("email")){
            if(emails.includes(interaction.options.getString("email"))){
                interaction.reply(`Dienos juoko prenumerata nutraukta ${interaction.member.user} ${vaje}`);
                emails.splice(emails.indexOf(interaction.options.getString("email")),1);
                saveEmail();
            } else {
                interaction.reply("``Sis elektroninio pasto adresas prenumeratos neturi.``" + `${what}`);
            }
        }
        else {
            interaction.reply("``Nebuvo nurodytas discord tag'as arba email'as!``" + `${really}`);
        }
    }
}