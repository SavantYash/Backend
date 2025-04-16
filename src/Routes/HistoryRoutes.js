const routes = require("express").Router()
const HistoryController = require("../Controllers/HistoryController")

routes.get("/getall",HistoryController.getAllData)
routes.get("/get/:id",HistoryController.getDataById)

module.exports = routes