const router = require("express").Router()
const { markAttendance, getAttendance, updateAttendance,getattendence } = require("../Controllers/AttendanceController.js")

router.post("/addattendance", markAttendance)
router.get("/getattendance/:classname/:subject/:date", getAttendance)
router.put("/updateattendance", updateAttendance)
router.get("/getattendence",getattendence)
module.exports = router