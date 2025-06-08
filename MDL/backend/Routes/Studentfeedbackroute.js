const { StudentFeedback, Getfeedback } = require("../Controllers/StudentFeedback.Controller.js")
const router = require("express").Router()
router.post("/studentfeedback", StudentFeedback)
router.get("/getfeedback",Getfeedback)
module.exports = router