const User = require('../models/users')
const crypto = require('crypto')

//Find user for login
async function getUser(req, res, next) {

    let result;
    try {
        if (req.body.username && req.body.password) {
            let hash = crypto.createHash('md5').update(req.body.password).digest("hex")
            //Query
            result = await User.find({
                username: req.body.username,
                password: hash

            })

            if (result.length == 0) {

                return res.render('login', { message: "Wrong credentials" })

            } else {
                req.session.loggedIn = true;
                return res.redirect('/secure/admin')
            }

        }
    } catch (err) {

        return res.status(500).json({ message: err.message })
    }

    res.result = result;
    next()
}

async function userAuth(req, res, next) {
    let result;
    try {
        if (req.session.loggedIn) {
            next()
        } else {
            return res.render('login', { message: "Not authenticated!" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
}


module.exports = { getUser, userAuth }