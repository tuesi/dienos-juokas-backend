const mongoose = require('mongoose');
const EmailModel = require('../models/emailModel');
const MentionModel = require('../models/mentionModel');
const emails = require('../lists/emails');
const mentions = require('../lists/mentions');

module.exports = async () => {
    if(!await EmailModel.findOne()) {
        var email = new EmailModel({
            emails: emails
        });
    
        email.save();
    } else {
        await EmailModel.updateOne({},{emails:emails});
    }
}