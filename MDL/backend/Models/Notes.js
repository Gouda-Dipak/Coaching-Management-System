const mongoose = require("mongoose")

const Notesschema = new mongoose.Schema({
    
    classname:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    notesfille  :{
        type: String,
        required: true
    }
})

const NotesModel = mongoose.model("TeacherNotes", Notesschema)

module.exports = NotesModel