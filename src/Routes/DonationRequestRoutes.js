const routes = require("express").Router()
const requestControllers = require("../Controllers/DonationRequestController")

routes.post("/add",requestControllers.addRequest)
routes.get("/get",requestControllers.getRequest)
routes.get("/get/:id",requestControllers.getRequestByDonorId)
routes.get("/getu/:id",requestControllers.getRequestByNgoId)
routes.get("/update/:id",requestControllers.updateStatusAccept)

module.exports = routes