const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json()); // Required to parse JSON request body


const roleRoutes = require("./src/Routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/Routes/UserRouter")
app.use(userRoutes)

const donationRoutes = require("./src/Routes/DonationRoutes")
app.use("/donation",donationRoutes)

const transportRoutes = require("./src/Routes/TransportRoutes")
app.use("/transport",transportRoutes)

const StateRoutes = require("./src/Routes/StateRoutes")
app.use("/state",StateRoutes)

const CityRoutes = require("./src/Routes/CityRoutes")
app.use("/city",CityRoutes)

const AreaRoutes = require("./src/Routes/AreaRoutes")
app.use("/area",AreaRoutes)

const RequestRoutes = require("./src/Routes/DonationRequestRoutes")
app.use("/request",RequestRoutes)

const HistoryRoutes = require("./src/Routes/HistoryRoutes")
app.use("/history",HistoryRoutes)

const chatRoutes = require("./src/Routes/ChatRoutes");
app.use("/api", chatRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("databse connects...")
})


//server init
const PORT = 5000
app.listen(PORT,()=>{
    console.log("services are running at port "+PORT)
})