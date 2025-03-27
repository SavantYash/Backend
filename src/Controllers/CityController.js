const CityModel = require("../Models/CityModel")

const addCity = async (req,res) => {
    try{
        const add = await CityModel.create(req.body)
        res.status(201).json({
            message : "Data added successfully...",
            data : add
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error...",
            data : err
        })
    }
}

const getCity = async(req,res) => {
    try{
        const data = await CityModel.find().populate("stateId")
        res.status(200).json({
            message : "Data fetched...",
            data : data
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error...",
            data : err
        })
    }
}

const getCityByState = async(req,res) => {
    try{
        const data = await CityModel.find({stateId:req.params.id})
        console.log(data)
        if(data != null){
        res.status(200).json({
            message : "data fetched...",
            data : data
        })
    }else{
        res.json({
            message : "City is not added in desiered state"
        })
    }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "internal server error..."
        })
    }
}

module.exports = {addCity,getCity,getCityByState}