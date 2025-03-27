const mongoose = require("mongoose")
const schema = mongoose.Schema

const TransportModel = new schema({
    donationRequestId : {
        type : schema.Types.ObjectId,
        ref : "donationRequest"
    },
    volunteerName : {
        type : String,
    }
},{timestamps:true})

module.exports = mongoose.model("transport",TransportModel)