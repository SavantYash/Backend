const history = require("../Models/History")
const UserModel = require("../Models/UserModel")
const multer = require("multer")
const cloudinaryUtil = require("../Utils/CloudanryUtil")
const path = require("path")

// the eoperation of creating data is heppens on donationrequestcontroller, here only code is for dashboard.

const getAllData = async (req, res) => {
    try {
        const data = await history.find()
        res.status(202).json({
            message: "Data fetched successfully...",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Internal server error..."
        })
    }
}

//get data via any user id
const getDataById = async (req, res) => {
    try {
        const { id } = req.params
        var data = null
        const user = await UserModel.findOne({ _id: id })
        console.log(user)
        if (user.roleName == "donor") {
            data = await history.find({ donorId: id })
        } else if (user.roleName == "ngo") {
            data = await history.find({ ngoId: id })
        }
        console.log(data)
        res.status(202).json({
            message: "Data fetched successfully...",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Internal server error..."
        })
    }
}

//get Data via history id
const getDataByHistoryId = async (req,res) => {
    try{
        const { id } = req.params
        const data = await history.findOne({_id:id}).populate("ngoId")
        res.status(202).json({
            message: "Data fetched successfully...",
            data: data
        })
    }catch(err){
        console.log(err)
        res.status(202).json({
            message: "Internal server error...",
        })
    }
}

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage: storage,
}).single("image");

const uploadlastImage = async (req,res) => {
    try{
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
                    console.log(cloudinaryResponse.secure_url)
                    console.log(req.body.id)
                    await history.updateOne({_id:req.body.id},{imageURL2 : cloudinaryResponse.secure_url})
                    res.status(201).json({
                        message: "post successfully",
                    });
                } catch (error) {
                    console.error("Upload Error:", error);
                    res.status(500).json({ message: "Upload failed", error });
                }
            });
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getAllData,
    getDataById,
    uploadlastImage,
    getDataByHistoryId
}
