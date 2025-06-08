const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors");

// const upload = require("./Middlewares/upload");

const Adminroute = require("./Routes/Adminroute")
const Studentroute = require("./Routes/Studentroute")
const Classroute = require("./Routes/Classroute.js")
// const TeacherNoticeroute = require("./Routes/TeacherNotesroute.js")
// const Teachernoticerouter = require("./Routes/TeacherNoticeroute.js")
const upload = require("./Middlewares/upload.js")
const { signup, adminprofile } = require("./Controllers/AdminController.js");
const { Studentsignup, updatestudentdetails } = require("./Controllers/StudentController.js");
const Teacherroute = require("./Routes/Teacherroute.js");
const { Teacherform } = require("./Controllers/TeacherController.js");
const Subjectroute = require("./Routes/Subjectroute.js");
const Noticerouter = require("./Routes/Noticeroute.js");
const AttendanceRoute = require("./Routes/AttendanceRoute.js");
const Timetablerouter = require("./Routes/Timetablerouter.js");
const { addTimetable } = require("./Controllers/TimetableController.js");
const { Teachernotice, GetallNotice, deleteById, Getclasses } = require("./Controllers/TeachernoticeController.js");
const { TeacherNotes, getallnotes } = require("./Controllers/TeacherNotesController.js");
const ClassModel = require("./Models/class.js");
const TeacherModel = require("./Models/teacher.js");
const Teacherclassroute = require("./Routes/TeacherclassRoute.js");
const Studentfeedbackroute = require("./Routes/Studentfeedbackroute.js");
const StudentModel = require("./Models/student.js");
require("dotenv").config()

require("./Models/db")

const app = express()

const PORT = process.env.PORT || 8080

app.use(bodyparser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static("./public/images"))

app.use("/images", express.static("./public/images"));


app.use("/admin", Adminroute)
// app.post("/admin",adminprofile)
app.use("/subject", Subjectroute)
app.post("/student/signup", upload.single("passphoto"), Studentsignup)
app.post("/admin/signup", upload.single("image"), signup)
app.post("/teacher/addteacher", upload.single("photo"), Teacherform)
app.post("/timetable/addTimetable", upload.single("table"), addTimetable)
app.use("/teacher", Teacherroute)
app.use("/student", Studentroute)
app.use("/notice", Noticerouter)
app.use("/timetable", Timetablerouter)
app.use("/class", Classroute)
app.use("/attendance", AttendanceRoute)
app.post("/t_notice/teachernotice", Teachernotice)
app.get("/t_notice/teachernotice/getallnotice", GetallNotice)
app.get("/t_notice/teachernotice/selectedclass/:classname", Getclasses)
app.get("/t_notice/teachernotice/delete/:id", deleteById)
app.post("/notes", upload.single("notesfille"), TeacherNotes);
app.get("/notes/sendnotes/:classname", getallnotes)
app.post("/Updatestudentdetails/:id", upload.single("passphoto"), updatestudentdetails)
app.get("/TotalAdminDashboards", async (req, res) => {
    const totalclass = await ClassModel.countDocuments()
    const totalteachers = await TeacherModel.countDocuments()
    const totalstudentes = await StudentModel.countDocuments()
    res.json({ totalclass, totalteachers,totalstudentes, success: true })
})
app.use("/teacherclass",Teacherclassroute)
app.use("/feedback",Studentfeedbackroute)
app.get("/", (req, res) => {
    res.send("welcome users")
})

app.listen(PORT, () => {
    console.log(`Server is Started in  http://localhost:${PORT}`);

})