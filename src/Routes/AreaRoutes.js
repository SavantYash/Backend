const routes = require("express").Router()
const AreaController = require("../Controllers/AreaController")

routes.post("/add",AreaController.addArea)
routes.get("/getareabycity/:id",AreaController.getAreaByCity)

module.exports = routes