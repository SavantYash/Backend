const routes = require("express").Router()
const StateController = require("../Controllers/StateController")

routes.post("/add",StateController.addStates)
routes.get("/get",StateController.getStates)

module.exports = routes