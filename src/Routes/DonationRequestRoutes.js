const routes = require("express").Router()
const requestControllers = require("../Controllers/DonationRequestController")

routes.post("/add",requestControllers.addRequest)
routes.get("/get",requestControllers.getRequest)
routes.get("/get/:id",requestControllers.getRequestByDonorId)
routes.get("/getu/:id",requestControllers.getRequestByNgoId)
routes.post("/update",requestControllers.updateStatus)

module.exports = routes