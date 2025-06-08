const mongoose = require("mongoose")

const Teacherschema = new mongoose.Schema({
    t_id: {
        type: Number,
        required: true
    },
    s_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
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
    mobilenumber: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    adharnumber: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },


})

const TeacherModel = mongoose.model("Teacher", Teacherschema)

module.exports = TeacherModel