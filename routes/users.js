const express = require("express");
const router = express.Router()
const users = require('../controllers/users');
const auth = require('../middleware/auth');
const translate = require('../controllers/translate')

router.get('/hello', (req, res) => {
    res.render('login', { message: "Enter username hello and password 1234" });
})
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/secure/hello');
});


router.post('/login', users.getUser)
router.get('/admin', auth.userAuth, translate.getAllLang)
router.post('/addLeng', translate.insertLang)
module.exports = router;