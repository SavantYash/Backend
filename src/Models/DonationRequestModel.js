const mongoose = require("mongoose")
const schema = mongoose.Schema

const DonationRequestModel = new schema({
    donationId : {
        type : schema.Types.ObjectId,
        ref : "Donation"
    },
    //from ngo live session
    ngoId : {
        type : schema.Types.ObjectId,
        ref : "user"
    },
    //from donation model 
    donorId : {
        type :schema.Types.ObjectId,
        ref : "user"
    },
    //updated when donor accept request
    time : {
        type : String
    },
    //shows address shows but can be able to change
    address : {
        type : String
    },
    imageURL:{
        type : String
    },
    //by default undefined after accept & decline response goes to ngo
    status : {
        type : String,
        enum : ["undefined","accept","decline"]
    }
},{timestamps : true})

module.exports = mongoose.model("donationRequest",DonationRequestModel)