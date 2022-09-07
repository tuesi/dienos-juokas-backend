const mongoose = require('mongoose');
const joke = require('../lists/jokeParams');
const JokeModel = require('../models/jokeModel');
const getJoke = require('../get-joke');
const saveJoke = require('./saveDailyJoke');

module.exports = async () => {

    //JOKE PARAMS
    const getNewJoke = () => {
        getJoke.getDailyJoke().then((newJoke) => {
            joke.joke = newJoke;
            saveJoke();
        })
    }
    getNewJoke();
}