const mongoose = require("mongoose")
const schema = mongoose.Schema

const TransportModel = new schema({
    historyId : {
        type : schema.Types.ObjectId,
        ref : "history"
    },
    volunteerId : {
        type:schema.Types.ObjectId,
        tref:'user',
        default:null
    },
    status : {
        type : String,
        enum : ["pending","start","In process","Complete","Assign Volunteer"],
        default : "pending"
    }
},{timestamps:true})

module.exports = mongoose.model("transport",TransportModel)