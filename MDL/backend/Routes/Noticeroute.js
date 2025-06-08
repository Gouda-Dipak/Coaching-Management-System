const { addnotice, getnotice, deleteById, FindByIdNotice, updateNotice,getnoticeInstudent, AllNoticeDesplayInHome} = require("../Controllers/NoticeCotroller.js")

const router = require("express").Router()

router.post("/addnotice", addnotice)
router.get("/getnotice", getnotice)
router.get("/delete/:id", deleteById)
router.get("/findByidNotice/:id", FindByIdNotice)
router.post("/UpdateByidNotice/:id", updateNotice)
router.get("/getnoticestudent",getnoticeInstudent)
router.get('/notice', AllNoticeDesplayInHome);
module.exports = router