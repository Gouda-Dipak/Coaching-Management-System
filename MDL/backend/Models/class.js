const mongoose = require("mongoose")

const classschema = new mongoose.Schema({
    
    classname:{
        type: String,
        required: true
    },
})

const ClassModel = mongoose.model("Class", classschema)

module.exports = ClassModel