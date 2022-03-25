const express = require("express");
const { render } = require("express/lib/response");
const path = require("path")
const router = express.Router()
const { getUser, userAuth } = require('../middleware/users')
const { insertLang } = require('../middleware/translate')
const { getAllLang } = require('../controllers/allLang')



router.get('/hello', (req, res) => {
    res.render('login', { message: "Enter username hello and password 1234" });
})
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/secure/hello');
});


router.post('/login', getUser, (req, res) => {
    res.render('admin', { message: result[0].username })
})
router.get('/admin', userAuth, (req, res) => {
    getAllLang().then((result) => {

        res.render('admin', { 'result': result })
    })
})
router.post('/addLeng', insertLang, (req, res) => {
    res.redirect('/secure/admin')
})
module.exports = router;