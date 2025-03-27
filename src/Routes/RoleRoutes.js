const routes = require("express").Router()

const RoleControllers = require("../Controllers/RoleController")

routes.get("/test",RoleControllers.getAllRoles)
routes.post("/add",RoleControllers.addUser)
routes.delete('/del/:id',RoleControllers.delUser)

module.exports=routes