const TransportModel = require("../Models/TransportModel")

const addTransport = async(req,res) => {
    try{
        await TransportModel.create(req.body)
        res.status(201).json({
            message:"Data added successfully...",
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error..."
        })
        console.log(err)
    }
}

module.exports = {
    addTransport
}