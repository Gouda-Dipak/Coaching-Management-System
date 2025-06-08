const mongoose = require("mongoose")

const mongo_url = process.env.MONGODB_CON || "mongodb://localhost:27017/MDL_Coaching"

mongoose.connect(mongo_url)
    .then(() => {
        console.log("mongodb connected successfully");
    })
    .catch((err) => {
        console.log(`mongodb connection failed : ${err}`);
    })
