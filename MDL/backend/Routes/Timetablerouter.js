const { gettimetable, DeleteByTable, getlatestTimetable } = require("../Controllers/TimetableController")

const router = require("express").Router()

// router.post("/addTimetable", addTimetable)
router.get("/getTimetable", gettimetable)
router.get("/delete/:id", DeleteByTable)
router.get("/latest", getlatestTimetable)

module.exports = router