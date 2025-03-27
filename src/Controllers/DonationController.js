const multer = require("multer")
const donationModel = require("../Models/DonationModel")
const cloudinaryUtil = require("../Utils/CloudanryUtil")
const path = require("path")
const fs = require("fs")

const addDonation = async (req, res) => {
    try {
        console.log(req.body)
        const add = await donationModel.create(req.body)
        res.status(201).json({
            message: 'Post created successfully...',
            data: add
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            data: err
        })
        console.log(err)
    }
}

const getData = async (req, res) => {
    const data = await donationModel.find().populate("donorId")
    res.json({
        data: data
    })
}

const getDataById = async(req,res) => {
    const data = await donationModel.find({donorId:req.params.id})
    res.status(200).json({
        data : data
    })
}

//file upload logic

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage: storage,
}).single("image");

const addDataWithFile = async (req, res) => {
try{
    upload(req, res, async (err) => {

        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            const filepath = path.resolve(req.file.path)
            const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudanry(fs.createReadStream(filepath));
            console.log(cloundinaryResponse);
            req.body.imageURL = cloundinaryResponse.secure_url
            const savedDonation = await donationModel.create(req.body);

            res.status(201).json({
                message: "donation post successfully",
                data: savedDonation
            });
        }

    });

}catch(err){
    res.status(500).json({
        message:'Internal server error...'
    })
    console.log(err)
}
}

const updateDonation = async(req,res) => {
    try{
        const id = req.params.id
        const data = req.body
        const updatedData = await donationModel.findByIdAndUpdate(id,data)
        res.status(200).json({
            "message":"Data updated succesfully...",
            data : updatedData
        })
    }catch(err){
        res.status(500).json({
            "message":"internal server error...",
            data : err
        })
    }
}

const deleteDonation = async(req,res) => {
    try{
        const id = req.params.id
        const data = await donationModel.findByIdAndDelete({_id:id})
        res.status(200).json({
            "message":"Data deleted successfully...",
            data : data
        })
    }catch(err){
        res.status(500).json({
            "message":"Internal server error...",
        })
        console.log(err)
    }
}

module.exports = { addDonation, getData, addDataWithFile, getDataById, updateDonation, deleteDonation }