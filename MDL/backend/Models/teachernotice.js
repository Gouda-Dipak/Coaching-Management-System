const mongoose = require("mongoose")

const teachernoticeschema = new mongoose.Schema({
    
    noticedescription:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    selectedclass:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
})

const TeacherNoticeModel = mongoose.model("TeacherNotice", teachernoticeschema)

module.exports = TeacherNoticeModel