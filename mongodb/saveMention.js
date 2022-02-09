const mongoose = require('mongoose');
const EmailModel = require('../models/emailModel');
const MentionModel = require('../models/mentionModel');
const emails = require('../lists/emails');
const mentions = require('../lists/mentions');

module.exports = async () => {
    if(!await MentionModel.findOne()) {
        var mention = new MentionModel({
            mentions: mentions
        });
    
        mention.save();
    } else {
        await MentionModel.updateOne({},{mentions:mentions});
    }
}