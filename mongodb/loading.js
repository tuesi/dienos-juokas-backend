const mongoose = require('mongoose');
const EmailModel = require('../models/emailModel');
const MentionModel = require('../models/mentionModel');
const emails = require('../lists/emails');
const mentions = require('../lists/mentions');
const checkJoke = require('./checkJoke');

module.exports = async () => {

    //EMAIL
    let newEmails = [];
    newEmails = await EmailModel.findOne();
    if(newEmails != null) {
        newEmails.emails.forEach(email => {
            emails.push(email);
        });
        console.log(emails);
    }
    
    //MENTIONS
    let newMentions = [];
    newMentions = await MentionModel.findOne();
    if(newMentions != null){
        newMentions.mentions.forEach(mention => {
            mentions.push(mention);
        });
        console.log(mentions);
    }

    checkJoke();
}