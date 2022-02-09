const mongoose = require('mongoose');
const JokeModel = require('../models/jokeModel');
const loadJoke = require('./loadJoke');
const newJoke = require('../lists/jokeParams');

module.exports = async () => {
    if(!await JokeModel.findOne()) {
        var joke = new JokeModel({
            joke: newJoke.joke,
        });
        joke.save();
    } else {
        await JokeModel.updateOne({},{joke: newJoke.joke});
    }
}