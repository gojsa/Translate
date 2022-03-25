const express = require("express");
const router = express.Router()
const translate = require('../controllers/translate')


router.get('/hello-rest', translate.getTrs)
router.get('/hello', translate.getTrsHtml)

module.exports = router;