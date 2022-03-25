const Translate = require('../models/translate')
// 


 async function getAllLang(){
    let result =  await Translate.find().select('word language -_id');//language
    return result;
}
module.exports ={getAllLang}
