const router = require("express").Router()
const { getStudentsbyclass } = require("../Controllers/StudentController")
const {Getallteacher, FindTeacherById, login, deleteTeacher, Showdata, updateTeacherdetails, displayallteachers} = require("../Controllers/TeacherController")

router.get("/getallteacher",Getallteacher)
router.get("/deleteteacher/:id",deleteTeacher)
router.get("/findByid/:id",FindTeacherById)
router.get("/getstudentsbyclass/:classname",getStudentsbyclass)
router.post("/login",login)
router.get("/displaydata/:teacherid",Showdata)
router.post("/UpdateTeacherdetails/:id", updateTeacherdetails)
router.get("/displayallteachers",displayallteachers)

module.exports = router