const { addclass, getclasses, Deleteclass, classbystudent } = require("../Controllers/AddclassController")
const router = require("express").Router()
router.post("/addclass", addclass)

router.get("/getclasses", getclasses)
router.get("/classBystudent", classbystudent)

router.get("/deleteclass/:id",Deleteclass)
module.exports = router