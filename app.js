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

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("databse connects...")
})


//server init
const PORT = 5000
app.listen(PORT,()=>{
    console.log("services are running......")
})









// app.get("/test",(req,res)=>{
//     console.log("test is running....")
//     res.send("test is running...")
// })

// app.get("/users",(req,res)=>{
//     res.json(
//         [  
//             {
//             massage : "jhgfcv",
//             data : [12,23,45]
//             },
//             {
//                 massage : "gfvbnh",
//                 data : [76,76]
//             }
//         ])
// })

// app.get("/employee",(req,res)=>{
//     res.json([
//         {
//             name : 'abc',
//             age:21,
//             salary : 12000,
//             position : 'hr'
//         },
//         {
//             name : 'def',
//             age:32,
//             salary : 21000,
//             position : 'hr'
//         },
//         {
//             name : 'ghk',
//             age:28,
//             salary : 18000,
//             position : 'hr'
//         }
//     ])
// })
