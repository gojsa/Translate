const Translate = require('../models/translate')

function checkAndInser() {
    Translate.count({}, async function(err, count) {
        
        if (count == 0) {


            try {

                await Translate.insertMany([{

                    word: "Hello World",
                    language: "en"
                }, {
                    word: "Ciao mondo",
                    language: "it"
                }, {
                    word: "Hallo Welt",
                    language: "de"
                }, {
                    word: "Hei Verden",
                    language: "no"
                }, {
                    word: "Salut Lume",
                    language: "ro"
                }, {
                    word: "Pozdravljen svet",
                    language: "sl"
                }, {
                    word: "Здраво свету",
                    language: "mk"
                }, {
                    word: "Sveika pasaule",
                    language: "lv"
                }, {
                    word: "Zdravo svijete",
                    language: "bs"
                }, {

                    word: "Bonjour monde",
                    language: "fr"
                }]);

            } catch (err) {
                console.log(err)
            }
        }
    })
}

module.exports = { checkAndInser };