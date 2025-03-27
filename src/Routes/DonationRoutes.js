const routes = require("express").Router()
const DonationController = require("../Controllers/DonationController")

routes.post("/add",DonationController.addDonation)
routes.get("/get",DonationController.getData)
routes.post("/addwithfile",DonationController.addDataWithFile)
routes.get("/getdatabyid/:id",DonationController.getDataById)
routes.put("/updatedonation/:id",DonationController.updateDonation)
routes.delete("/deletedonation/:id",DonationController.deleteDonation)


module.exports = routes