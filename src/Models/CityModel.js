const mongoose = require("mongoose")
const schema = mongoose.Schema

const CityModel = new schema({
    name : {
        type : String
    },
    stateId : {
        type : schema.Types.ObjectId,
        ref : "state"
    }
})

module.exports = mongoose.model("city",CityModel)