const mongoose = require("mongoose")
const schema = mongoose.Schema

const AreaModel = new schema({
    name : {
        type : String
    },
    cityId : {
        type : schema.Types.ObjectId,
        ref : "city"
    },
    stateId : {
        type : schema.Types.ObjectId,
        ref : "state"
    }
})

module.exports = mongoose.model("area",AreaModel)