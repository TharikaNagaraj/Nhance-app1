const express = require("express")
const router = express.Router()
const userController = require("../app/controllers/userController")
const userAuthenticate = require("../app/middleware/userAuthenticate")


router.post("/api/app1/register",userController.register)
router.post("/api/app1/login",userController.login)
router.get("/api/app1/user",userAuthenticate,userController.show)
router.put("/api/app1/add-user-info",userAuthenticate,userController.update)
router.get("/api/app1/get-user-info",userAuthenticate,userController.display)
router.get("/api/app1/search-email/:email",userController.search)

router.get("/api/app1/email-search/:email",userController.searchUser)



module.exports = router