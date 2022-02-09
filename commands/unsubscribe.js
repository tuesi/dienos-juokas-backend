const mentions = require('../lists/mentions.js');
const emails = require('../lists/emails.js');
const saveEmail = require('../mongodb/saveEmail');
const saveMention = require('../mongodb/saveMention');
module.exports = {
    name: 'sustabdyti',
    description: "Dienos juoko prenumeratos nutraukimas!",
    execute(message) {

        var date = new Date();
        const image = (date.getUTCMonth()+1).toString() + "-" + (date.getUTCDate()).toString() +'.png';

        const newMessage = message.content.slice(4+this.name.length);

        if(message.mentions.users.first() != null) {
            const mention = message.mentions.users.first();
            if(mentions.includes(mention)){
                message.channel.send(`Dienos juoko prenumerata nutraukta ${mention}`);
                mentions.splice(mentions.indexOf(mention),1);
                saveMention();
            } else {
                message.channel.send("``Sis vartotojas prenumeratos neturi``");
            } 
        }
        else if(newMessage) {
            if(emails.includes(newMessage)){
                message.channel.send("Dienos juoko prenumerata nutraukta " + message.author.toString());
                emails.splice(emails.indexOf(newMessage),1);
                saveEmail();
            } else {
                message.channel.send("``Sis elektroninio pasto adresas prenumeratos neturi``");
            }
        } else {
            message.channel.send("```Neivestas elektroninio pasto adresas \n\n !GE prenumeruoti <email>```");
        }
    }
}