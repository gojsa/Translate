const User = require('../models/users')

exports.userAuth = async function(req, res, next) {
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