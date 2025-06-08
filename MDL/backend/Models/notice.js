const mongoose = require("mongoose")

const Noticeschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }
})

const NoticeModel = mongoose.model("Notice", Noticeschema)

module.exports = NoticeModel