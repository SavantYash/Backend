const transport = require("../Controllers/TransportController")
const route = require("express").Router()

route.post("add",transport.addTransport)
route.get("/get",transport.getTransport)
route.get("/update/:id/:id1",transport.onAccept)
route.get("/get/:id",transport.fetchDataByVid)

module.exports = route