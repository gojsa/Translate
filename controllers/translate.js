require('dotenv').config()
const axios = require("axios").default;
const Translate = require('../models/translate')
exports.getTrs = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    let result;
    try {

        //Check for env variable for external translate or db translate
        if (process.env.TYPE == "DB") {

            if (req.query.language) {
                //Query
                result = await Translate.find({ language: req.query.language })

                if (result.length == 0) {
                    return res.status(404).json({ message: "Cannot find language" })
                } else {
                    return res.json({ message: result[0].word })
                }

            } else {
                //Default english query
                result = await Translate.find({ language: "english" })
                return res.json({ message: result[0].word })


            }
        } else {
            if (req.query.language) {
                //External service
                let options = {
                    method: 'POST',
                    url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com',
                        'X-RapidAPI-Key': process.env.API_KEY
                    },
                    data: {
                        from: 'en',
                        to: req.query.language,
                        e: '',
                        q: [
                            'Hello World'
                        ]
                    }
                };

                axios.request(options).then(function(response) {

                    return res.json({ message: response.data[0] })
                }).catch(function(error) {
                    return res.status(500).json({ message: error })


                });
            } else {
                //Default english
                return res.json({ message: "Hello World" })
            }
        }
    } catch (err) {

        return res.status(500).json({ message: err.message })
    }



}
exports.getTrsHtml = async function(req, res) {

        let result;
        try {
            //Check for env variable for external translate or db translate
            if (process.env.TYPE == "DB") {
                if (req.query.language) {
                    //Query
                    result = await Translate.find({ language: req.query.language })

                    if (result.length == 0) {

                        return res.render('index', { message: "Cannot find language" })

                    } else {

                        return res.render('index', { message: result[0].word })
                    }

                } else {
                    //Default english
                    result = await Translate.find({ language: "english" })
                    return res.render('index', { message: result[0].word })


                }
            } else {
                if (req.query.language) {
                    //External service
                    let options = {
                        method: 'POST',
                        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                        headers: {
                            'content-type': 'application/json',
                            'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com',
                            'X-RapidAPI-Key': process.env.API_KEY
                        },
                        data: {
                            from: 'en',
                            to: req.query.language,
                            e: '',
                            q: [
                                'Hello World'
                            ]
                        }
                    };

                    axios.request(options).then(function(response) {


                        return res.render('index', { message: response.data[0] })

                    }).catch(function(err) {
                        return res.status(500).json({ message: err })


                    });
                } else {
                    //Default english
                    return res.render('index', { message: "Hello World" })

                }
            }
        } catch (err) {

            return res.status(500).json({ message: err.message })
        }

    }
    //Insert language
exports.insertLang = async function(req, res, next) {
    let query, word, language;

    if (req.body.word && req.body.language) {
        word = req.body.word;
        language = req.body.language;
        try {

            query = await Translate.create({
                word: word,
                language: language.toLowerCase()
            })
            res.redirect('/secure/admin')
        } catch (error) {
            return res.status(500).json({ message: err.message })
        }
    } else {
        return res.redirect('/secure/admin')
    }
}

exports.getAllLang = async function(req, res) {
    let result;
    try {
        result = await Translate.find().select('word language -_id');
        res.render('admin', { 'result': result })

    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    return result;
}