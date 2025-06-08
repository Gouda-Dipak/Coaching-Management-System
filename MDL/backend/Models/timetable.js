const mongoose = require("mongoose")

const Timetableschema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true })

const TimeTableModel = mongoose.model("TimeTable", Timetableschema)

module.exports = TimeTableModel