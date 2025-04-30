const routes = require("express").Router()
const HistoryController = require("../Controllers/HistoryController")

routes.get("/getall",HistoryController.getAllData)
routes.get("/get/:id",HistoryController.getDataById)
routes.post("/upload",HistoryController.uploadlastImage)
routes.get("/gethistory/:id",HistoryController.getDataByHistoryId)

module.exports = routes