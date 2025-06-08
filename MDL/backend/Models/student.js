const mongoose = require("mongoose")

const Studentschema = new mongoose.Schema({
    s_id: {
        type: Number,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    adharnumber: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    s_classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",  // Ye Class model ka reference he
        required: true
    },
    s_class: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    passphoto: {
        type: String,
        required: true
    },
    mobilenumber:{
        type:Number,
        required:true
    }

})

const StudentModel = mongoose.model("Student", Studentschema)

module.exports = StudentModel