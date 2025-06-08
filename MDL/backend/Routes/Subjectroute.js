const { Addsubject, getSubjects, DeleteSubject } = require("../Controllers/SubjectController")

const router = require("express").Router()

router.post("/addsubject", Addsubject)
router.get("/getsubjects", getSubjects)
router.get("/dletesubject/:id",DeleteSubject)
module.exports = router