const rp = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();
const url = process.env.JOKE_URL;

module.exports = {
    getDailyJoke: async function () {
        var page = getRandomInt(285);
        if(page == 1){
            return rp(url)
            .then(function(html){
                const $ = cheerio.load(html);
                let allElements = $('div> p');
                var newJoke = $(allElements.get(getRandomInt(allElements.length - 2))).text();
                return newJoke;
            })
            .catch(function(err){
        
            });
        }
        else {
            return rp(url + '/' + page)
            .then(function(html){
                const $ = cheerio.load(html);
                let allElements = $('div> p');
                var newJoke = $(allElements.get(getRandomInt(allElements.length - 2))).text();
                return newJoke;
            })
            .catch(function(err){
                console.log(err);
            });
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max-1)) + 1;
  }
