module.exports = {
    name: 'help',
    description: "Pagalba!",
    execute(message) {
        message.channel.send("``Komandos``");
        message.channel.send("``!GE dienos juokas - dienos juokas \n\n !GE prenumeruoti <email> - gauti juoku prenumerata elektroniniu pastu \n\n !GE prenumeruoti <tag> - gauti juoku prenumerata discord zinutemis \n\n !GE sustabdyti <email> - nutraukti juoku prenumerata elektroniniam adresui \n\n !GE sustabdyti <tag> - nutraukti juoku prenumerata discord vartotojui``");
    }
}