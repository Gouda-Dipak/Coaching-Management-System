const mongoose = require("mongoose")

const Subjectschema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: {
        type: Number,
        required: true
    }
})

const SubjectModel = mongoose.model("Subject", Subjectschema)

module.exports = SubjectModel