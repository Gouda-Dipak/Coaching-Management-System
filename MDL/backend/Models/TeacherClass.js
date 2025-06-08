const mongoose = require("mongoose")

const Teacherclassschema = new mongoose.Schema({
    
    className: {
        type: String,
        required: true
    },
    TeacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",  // Ye Class model ka reference he
        required: true
    },
    SubjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",  // Ye Class model ka reference he
        
    },
    SubjectName:{
        type: String,
        default:""
    }
})

const TeacherClassModel = mongoose.model("TeacherClass", Teacherclassschema)

module.exports = TeacherClassModel