const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JokeSchema = new Schema ({
    joke: String,
});

const JokeModel = mongoose.model('dailyJoke', JokeSchema, 'dailyJoke');

module.exports = JokeModel;