const User = require('../models/users')
const crypto = require('crypto')

function checkAndInserUser() {
    User.count({}, async function(err, count) {
        let hash = crypto.createHash('md5').update('1234').digest("hex")
       
        if (count == 0) {


            try {

                await User.create({
                    username: "hello",
                    password: hash
                });

            } catch (err) {
                console.log(err)
            }
        }
    })
}

module.exports = { checkAndInserUser };