const mongoose = require("mongoose")
const schema = mongoose.Schema

const StateModel = new schema({
    name : {
        type : String
    }
})

module.exports = mongoose.model("state",StateModel)