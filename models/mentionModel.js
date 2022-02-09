const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentionSchema = new Schema ({
    mentions: [String]
});

const MentionModel = mongoose.model('mentions', MentionSchema);

module.exports = MentionModel;