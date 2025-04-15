const multer = require("multer")
const donationModel = require("../Models/DonationModel")
const cloudinaryUtil = require("../Utils/CloudanryUtil")
const path = require("path")

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

const getDataById = async (req, res) => {
    const data = await donationModel.find({ donorId: req.params.id })
    res.status(200).json({
        data: data
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

    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "Internal server error",
            });
        } try {
            const filepath = path.resolve(req.file.path);
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudanry(filepath);
            req.body.imageURL = cloudinaryResponse.secure_url;

            const savedDonation = await donationModel.create(req.body);
            res.status(201).json({
                message: "donation post successfully",
                data: savedDonation
            });
        } catch (error) {
            console.error("Upload Error:", error);
            res.status(500).json({ message: "Upload failed", error });
        }
    });
}

const updateDonation = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const updatedData = await donationModel.findByIdAndUpdate(id, data)
        res.status(200).json({
            "message": "Data updated succesfully...",
            data: updatedData
        })
    } catch (err) {
        res.status(500).json({
            "message": "internal server error...",
            data: err
        })
    }
}

const deleteDonation = async (req, res) => {
    try {
        const id = req.params.id
        const data = await donationModel.findByIdAndDelete({ _id: id })
        res.status(200).json({
            "message": "Data deleted successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            "message": "Internal server error...",
        })
        console.log(err)
    }
}

module.exports = { addDonation, getData, addDataWithFile, getDataById, updateDonation, deleteDonation }