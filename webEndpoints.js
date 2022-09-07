const emails = require('./lists/emails.js');
const saveEmail = require('./mongodb/saveEmail');
const validator = require('email-validator');
const joke = require('./lists/jokeParams');

module.exports = {

    unsubscribe(app){
        app.get("/unsubscribe", (req,res) => {
            var email = req.query.email;
            if(emails.includes(email)){
                res.send("You have successfully unsubscribed!");
                emails.splice(emails.indexOf(email),1);
                saveEmail();
            } else {
                res.send("This email is not subscribed!");
            }
        });
    },

    subscribe(app){
        app.get("/subscribe", (req,res) => {
            var email = req.query.email;
            if(emails.includes(email)){
                res.json({status: 1});
            } else {
                if(validator.validate(email)){
                    emails.push(email);
                    saveEmail();
                    res.json({status: 0});
                } else {
                    res.json({status: 2});
                }
            }
        });
    },

    dailyJoke(app){
        app.get("/daily", (req,res) => {
            var date = new Date();
            if(date.getHours() >= 11){
                res.json({joke: joke.joke});
            }
        });
    }
}

