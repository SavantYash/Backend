const StateModel = require("../Models/StateModel")

const addStates = async (req, res) => {
    try {
        console.log(req.body)
        const add = await StateModel.create(req.body)
        res.status(201).json({
            message : "Data added successfully...",
            data : add
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error",
            data : err
        })
    }
}

const getStates = async (req,res) => {
    try{
        const data = await StateModel.find()
        res.status(200).json({
            message : "Data fetched successfully...",
            data : data
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error...",
            data : err
        })
    }
}

module.exports = {addStates,getStates}