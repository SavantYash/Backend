const AreaModel = require("../Models/AreaModel")

const addArea = async (req,res) => {
    try{
        const add = await AreaModel.create(req.body)
        res.status(201).json({
            message : "Data added succcessfully...",
            data : add
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error..."
        })
    }
}

const getAreaByCity = async(req,res) => {
    try{
        const data = await AreaModel.find({cityId:req.params.id})
        res.status(200).json({
            message : "data fetched...",
            data : data
        })
    }catch(err){
        res.status(500).json({
            message : "internal server error..."
        })
    }
}

module.exports = {addArea,getAreaByCity}