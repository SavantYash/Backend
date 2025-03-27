const routes = require("express").Router()
const CityController = require("../Controllers/CityController")

routes.post("/add",CityController.addCity)
routes.get("/get",CityController.getCity)
routes.get("/getcitybystate/:id",CityController.getCityByState)

module.exports = routes