const routes = require("express").Router()

const userControllers = require("../Controllers/UserController")

routes.post("/addUser",userControllers.addUser)
routes.post("/signIn",userControllers.signIn)
routes.get("/getProfileById/:id",userControllers.getProfileById)
routes.put("/updateuser/:id",userControllers.updateProfile)
routes.put("/deleteuser/:id",userControllers.deleteProfile)
routes.get("/getallusers",userControllers.getAllUser)
routes.post("/getByRole",userControllers.getUsersByName)
routes.post("/code",userControllers.sendVerificationCode)
routes.post("/forgotpassword",userControllers.forgotPassword)
routes.post("/resetpassword",userControllers.resetpassword)
module.exports = routes