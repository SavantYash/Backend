const mongoose = require("mongoose")
const schema = mongoose.Schema

const roleschema = new schema({
    name : {
        type : String
    }
})

module.exports = mongoose.model("roles",roleschema)