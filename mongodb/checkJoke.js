const mongoose = require('mongoose');
const joke = require('../lists/jokeParams');
const JokeModel = require('../models/jokeModel');
const getJoke = require('../get-joke');
const loadJoke = require('./loadJoke');

module.exports = async () => {

    //JOKE PARAMS
    let newJoke = [];
    newJoke = await JokeModel.findOne();
    if(newJoke.joke === null){
        loadJoke();
    } else {
        joke.joke = newJoke.joke;
    }
}