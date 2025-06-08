// const { Addsubject, getSubjects, DeleteSubject } = require("../Controllers/SubjectController")

const { Teacherclass, displayteacherclasses, updatesubject, DeleteTeacher, displayclassdetails} = require("../Controllers/TeacherclassController")

const router = require("express").Router()

router.post("/teachercls", Teacherclass)
router.get("/getteachercls/:classname", displayteacherclasses)
router.post("/updateteachercls/:id", updatesubject)
router.get("/deleteteachercls/:teacherId",DeleteTeacher)
// router.get("/classdetails/:id",displayclassdetails)
module.exports = router