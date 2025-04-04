const mongoose = require("mongoose")
const schema = mongoose.Schema

const TransportModel = new schema({
    donationRequestId : {
        type : schema.Types.ObjectId,
        ref : "donationRequest"
    },
    volunteerId : {
        type:schema.Types.ObjectId,
        tref:'user',
        
    },
    status : {
        type : String,
        enum : ["pending","start","In process","Complete","Assign Volunteer"],
        default : "pending"
    }
},{timestamps:true})

module.exports = mongoose.model("transport",TransportModel)