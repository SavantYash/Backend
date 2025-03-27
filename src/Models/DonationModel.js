const mongoose = require("mongoose")
const schema = mongoose.Schema

const DonationModel = new schema({
    donorId : {
        type : schema.Types.ObjectId,
        ref : "user"
    },
    category : {
        type : String // male,female
    },
    size : {
        type : String
    },
    quantity : {
        type : Number
    },
    condition : {
        type : String
    },
    description : {
        type : String
    },
    address:{
        type : String
    },
    imageURL : {
        type : String
    },
    state : {
        type : schema.Types.ObjectId,
        ref : "state"
    },
    city : {
        type : schema.Types.ObjectId,
        ref : "city"
    },
    area : {
        type : schema.Types.ObjectId,
        ref : "area"
    }
},{timestamps : true})

module.exports = mongoose.model("Donation",DonationModel)