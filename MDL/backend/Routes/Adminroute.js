const { login ,adminprofile} = require("../Controllers/AdminController")

const router = require("express").Router()

router.post("/login", login)
router.get("/getdetails/:id", adminprofile)

module.exports = router