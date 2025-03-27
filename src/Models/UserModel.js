const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserModel = new schema({
    name:{
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    number : {
        type : String
    },
    role : {
        type : schema.Types.ObjectId,
        ref : "roles"
    },
    registrationNumber : {
        type : String
    },
    address :  {
        type : String
    }
})

module.exports = mongoose.model("user",UserModel)