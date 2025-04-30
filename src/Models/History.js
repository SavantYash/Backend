const mongoose = require("mongoose")
const schema = mongoose.Schema

const History = new schema({
    donorId : {
        type : schema.Types.ObjectId,
        ref : "user"
    },
    volunteerId : {
        type : schema.Types.ObjectId,
        ref : "transport"
    },
    ngoId : {
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
    status : {
        type : String,
        enum : ["Pending","PickedUp","Delivered","Assign Volunteer"],
        default : "Pending"
    },
    description : {
        type : String
    },
    address:{
        type : String
    },
    to:{
        type: String
    },
    imageURL : {
        type : String
    },
    imageURL2 : {
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
},{
    timestamps : true
})

module.exports = mongoose.model("history",History)