const express = require("express");
const path = require("path")
const router = express.Router()
const { getTrs, getTrsHtml } = require('../middleware/translate')


router.get('/hello-rest', getTrs, async(req, res) => {

    res.send.json({ message: res })
})
router.get('/hello', getTrsHtml, (req, res) => {

    res.render('index')
})


module.exports = router;