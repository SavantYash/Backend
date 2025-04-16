const history = require("../Models/History")

// the eoperation of creating data is heppens on donationrequestcontroller, here only code is for dashboard.

const getAllData = async (req,res)=>{
    try{
        const data = await history.find()
        res.status(202).json({
            message : "Data fetched successfully...",
            data : data
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : "Internal server error..."
        })
    }
}

const getDataById = async (req,res)=>{
    try{
        const {id} = req.params
        console.log(id)
        const data = await history.find({donorId:id})
        console.log(data)
        res.status(202).json({
            message : "Data fetched successfully...",
            data : data
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : "Internal server error..."
        })
    }
}

module.exports = {
    getAllData,
    getDataById
}
