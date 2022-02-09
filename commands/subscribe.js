const mentions = require('../lists/mentions.js');
const emails = require('../lists/emails.js');
const sendEmail = require('../sendEmail.js');
const saveEmail = require('../mongodb/saveEmail');
const saveMention = require('../mongodb/saveMention');
module.exports = {
    name: 'prenumeruoti',
    description: "Dienos juoko prenumerata!",
    execute(message, args, Discord, client) {

        const newMessage = message.content.slice(4+this.name.length);

        if(message.mentions.users.first() != null) {
            const mention = message.mentions.users.first();
            if(!mentions.includes(mention.id)){
                message.channel.send(`Dienos juokas uzprenumeruotas ${mention}`);
                //mention.send(newEmbed);
                mentions.push(mention);
                saveMention();
            } else {
                message.channel.send("Dienos juokas jau uzprenumeruotas!");
            }
            
        }
        else if(newMessage) {
            if(!emails.includes(newMessage)){
                message.channel.send("Dienos juokas uzprenumeruotas " + message.author.toString());
                //sendEmail.sendEmail(newMessage, image);
                emails.push(newMessage);
                saveEmail();
            } else {
                message.channel.send("Dienos juokas jau uzprenumeruotas!");
            }
        } else {
            message.channel.send("```Neivestas elektroninio pasto adresas \n\n !GE prenumeruoti <email>```");
        }
    }
}