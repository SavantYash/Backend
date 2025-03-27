const transport = require("../Controllers/TransportController")
const route = require("express").Router()

route.post("add",transport.addTransport)

module.exports = route