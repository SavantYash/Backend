const transport = require("../Controllers/TransportController")
const route = require("express").Router()

route.post("add",transport.addTransport)
route.get("/get",transport.getTransport)
route.get("/update/:id/:id1",transport.onAccept)
route.get("/get/:id",transport.fetchDataByVid)  //to tracking one data
route.get("/getv/:id",transport.fetchDataById1) //for getting data via volunteer id
route.get("/update/:id",transport.updateStatus)
route.get("/getPriviousData/:id",transport.getDataById)


module.exports = route