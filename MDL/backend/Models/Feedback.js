const mongoose = require("mongoose")

const Feedbackschema = new mongoose.Schema({
    
    s_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    s_class:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
    
})

const FeedbackModel = mongoose.model("Feedback", Feedbackschema)

module.exports = FeedbackModel