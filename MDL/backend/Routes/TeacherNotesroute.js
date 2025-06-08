const { FindByIdNotes, getallnotes } = require("../Controllers/TeacherNotesController")
const { getStudentsbyclass, getsubjects } = require("../Controllers/TeacherNotesController")

const router = require("express").Router()

router.get("/getsubjects/:subjectName", getsubjects)


module.exports = router