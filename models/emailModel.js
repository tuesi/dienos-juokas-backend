const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema ({
    emails: [String]
});

const EmailModel = mongoose.model('emails', EmailSchema);

module.exports = EmailModel;