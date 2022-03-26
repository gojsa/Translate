//Connect to DB
function dbConnection() {
    const mongoose = require("mongoose");
    mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log("Connected to database"))
}
module.exports = { dbConnection }