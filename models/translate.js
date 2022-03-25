const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({

    word: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("Translate", transSchema)